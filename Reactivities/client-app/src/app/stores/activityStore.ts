import { observable, action, computed, runInAction, reaction } from 'mobx';
import services, { API_SIGNALR_URL } from "src/app/api/service";
import { IActivity, IComment } from 'src/app/models/Activity';
import { v4 as uuid } from "uuid";
import service from 'src/app/api/service';
import { history } from "../..";
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { setActivityProps, createAttendee } from "src/app/common/util/util";
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

const LIMIT = 2;

export default class ActivityStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(() => this.predicate.keys(), () => {
            this.page = 0;
            this.activityRegistry.clear();
            this.loadActivities();
        });
    }

    @observable activityRegistry = new Map();
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable loading = false;
    @observable activity?: IActivity;
    @observable target = '';
    @observable.ref hubConnection: HubConnection | null = null;  // not make deep sub prop checking
    @observable activityCount = 0;
    @observable page = 0;
    @observable predicate = new Map();

    @action setPredicate = (predicate: string, value: string | Date) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value);
        }
    }

    @computed get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', String(LIMIT));
        params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, value.toISOString());
            } else {
                params.append(key, value);
            }
        })
        return params;
    }

    @computed get totalPages() {
        return Math.ceil(this.activityCount / LIMIT);
    }

    @action setPage = (page: number) => {
        this.page = page;
    }

    @action createHubConnection = (activityId: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(API_SIGNALR_URL, {
                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build();
        
        this.hubConnection
            .start()
            .then(() => {
                console.log('Attempting to join group');
                this.hubConnection!.invoke('AddToGroup', activityId);
            })
            .then(() => console.log(this.hubConnection!.state))
            .catch((err: string) => console.error('Error establishing connection:', err));

        this.hubConnection.on('ReceiveComment', (comment: IComment) => {
            runInAction(() => {
                this.activity!.comments.push(comment);
            });
        })

        this.hubConnection.on('Send', (message: string) => {
            toast.info(message);
        })
    }

    @action stopHubConnection = () => {
        this.hubConnection!.invoke('RemoveFromGroup', this.activity!.id)
            .then(() => {
                this.hubConnection!.stop();
            })
            .then(() => {
                console.log('Connection stopped');
            })
            .catch((err: string) => {
                console.log('Error', err);
            });

    }

    @action addComment = async (values: any) => {
        values.activityId = this.activity!.id;
        try {
            // SendComment handle was declared in backend - Api/SignalR/ChatHub.cs
            await this.hubConnection!.invoke('SendComment', values);
        } catch (err) {
            console.log(err);
        }
    }

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
    }

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort((a, b) => +a.date! - +b.date!);
        return Object.entries(sortedActivities.reduce((activityGroup, activity) => {
            const date = activity.date!.toISOString().split('T')[0];
            activityGroup[date] = activityGroup[date] ? [...activityGroup[date], activity] : [activity];
            return activityGroup;
        }, {} as { [key: string]: IActivity[]}));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const { activities, activityCount } = await services.activity.list(this.axiosParams);
            // we should add string for 1st param because should be testable easier with mobx devtool
            // since await use promise then in behind we must run every observable changes in runInAction, before await it is ok
            runInAction('loading activities', () => {
                const user = this.rootStore.userStore.user!;
                activities.forEach(activity => {
                    setActivityProps(activity, user);
                    this.activityCount = activityCount;
                    this.activityRegistry.set(activity.id, activity);
                });
            });
        } catch(err) {
            console.error(err);
        }
        // since await use promise then in behind we must run every observable changes in runInAction
        // if we call action instead of setting directly the obseravle value then this should be ok
        runInAction('turn off loading spiner', () => {
            this.loadingInitial = false;
        });
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await service.activity.details(id);
                runInAction('load a single activity', () => {
                    setActivityProps(activity, this.rootStore.userStore.user!);
                    this.activity = activity;
                    this.activityRegistry.set(activity.id, activity);
                    this.loadingInitial = false;
                });
            } catch (err) {
                runInAction('disable loader for activity load', () => this.loadingInitial = false);
                console.log(err);
            }            
        }
        return activity;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action clearActivity = () => {
        this.activity = undefined;
    }

    @action setSubmitting = (value: boolean) => {
        this.submitting = value;
    }

    @action onCreateOrEdit = async (activity: IActivity) => {
        this.setSubmitting(true);
        if (activity.id) {
            try {
                const existingActivity = this.activityRegistry.get(activity.id);
                if (!existingActivity) return;
                Object.assign(existingActivity, activity);
                await services.activity.update(existingActivity);
                runInAction('update activity', () => {
                    this.activityRegistry.set(existingActivity.id, existingActivity);
                    this.activity = existingActivity;
                });
            } catch (err) {
                this.setSubmitting(false);
                toast.error('Problem submitting data!');
                return console.error(err.response);
            }
        } else {
            try {
                activity.id = uuid();
                await services.activity.create(activity);
                const attendee = createAttendee(this.rootStore.userStore.user!);
                attendee.isHost = true;
                activity.attendees = [ attendee ];
                activity.comments = [];
                activity.isHost = true;
                runInAction('create activity', () => {
                    this.activityRegistry.set(activity.id, activity);
                    this.activity = activity;
                });  
            } catch (err) {
                this.setSubmitting(false);
                toast.error('Problem submitting data!');
                return console.error(err.response);
            }            
        }
        this.setSubmitting(false);
        history.push(`/activities/${activity.id}`);
    }

    @action onDelete = async (ev: React.SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.target = ev.currentTarget.name;
        try {
            await services.activity.delete(id);
            runInAction('delete activity', () => {
                this.activityRegistry.delete(id);
            });
        } catch (err) {
            console.error(err);
        }
    }

    @action attendActivity = async () => {
        const attendee = createAttendee(this.rootStore.userStore.user!);
        this.loading = true;
        try {
            await services.activity.attend(this.activity!.id!);
            runInAction(() => {
                this.activity!.attendees.push(attendee);
                this.activity!.isGoing = true;
                this.activityRegistry.set(this.activity!.id, this.activity);
                this.loading = false;
            });
        } catch (err) {
            runInAction(() => this.loading = false);
            toast.error('Problem signing up to activity');
        }
    }
    
    @action cancelAttendance = async () => {
        this.loading = true;
        try {
            await services.activity.unattend(this.activity!.id!);
            runInAction(() => {
                const user = this.rootStore.userStore.user!;
                this.activity!.attendees = this.activity!.attendees.filter(x => x.username !== user.username);
                this.activity!.isGoing = false;
                this.activityRegistry.set(this.activity!.id, this.activity);
                this.loading = false;
            });
        } catch (err) {
            runInAction(() => this.loading = false);
            toast.error('Problem at cancel activity');
        }
    }
}

// another option is not using decorator in class and we use it here:
/*
decorate(ActivityStore, {
    actityRegistry: observable,
    selectedActivity: observable,
    .......................
    activityByDate: computed,
    .......................
    loadActivities: action,
    .......................
});
*/