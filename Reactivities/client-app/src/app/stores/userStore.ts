import { createContext } from 'react';
import { observable, action, computed, configure, runInAction } from 'mobx';
import services from "@service";
import { IActivity } from '@models/Activity';
import { IUser, IUserFormValues } from '@models/User';
import { v4 as uuid } from "uuid";
import service from '@service';
import { history } from "../..";
import { toast } from 'react-toastify';

// add strict mode
configure({ enforceActions: true });

class UserStore {
    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return !!this.user;
    }



    @observable activityRegistry = new Map();
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable activity?: IActivity;
    @observable target = '';

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
            const activities = await services.activity.list();
            // we should add string for 1st param because should be testable easier with mobx devtool
            // since await use promise then in behind we must run every observable changes in runInAction, before await it is ok
            runInAction('loading activities', () => {
                activities.forEach(activity => {
                    activity.date = new Date(activity.date!);
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
                    activity.date = new Date(activity.date);
                    this.activity = activity;
                    this.activityRegistry.set(activity.id, activity);
                    this.loadingInitial = false;
                });
            } catch (err) {
                runInAction('disable loader for activity load', () => this.loadingInitial = false);
                console.log(err);
            }            
        }
        return activity
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
}


export default createContext(new UserStore());