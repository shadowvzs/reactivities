import { createContext } from 'react';
import { observable, action, computed, configure, runInAction } from 'mobx';
import services from "@service";
import { IActivity } from '@models/Activity';
import { v4 as uuid } from "uuid";

// add strict mode
configure({ enforceActions: true });

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable selectedActivity?: IActivity;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await services.activity.list();
            // we should add string for 1st param because should be testable easier with mobx devtool
            // since await use promise then in behind we must run every observable changes in runInAction, before await it is ok
            runInAction('loading activities', () => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
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

    @action selectActivity = (activity?: IActivity) => {
        this.selectedActivity = activity;
        this.editMode = false;
    }

    @action setEditMode = (value: boolean) => {
        this.editMode = value;
    }

    @action cancelEditMode = () => this.selectActivity(undefined);

    @action setSubmitting = (value: boolean) => {
        this.submitting = value;
    }

    @action onCreateOrEdit = async (activity: IActivity) => {
        this.setSubmitting(true);
        if (activity.id) {
            try {
                const existingActivity = this.activityRegistry.get(activity.id);
                if (!existingActivity) return;
                await services.activity.update(existingActivity);
                Object.assign(existingActivity, activity);
                runInAction('update activity', () => {
                    this.activityRegistry.set(existingActivity.id, existingActivity);
                });
                this.selectActivity(existingActivity);
                this.setEditMode(false);
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const newActivity: IActivity = {...activity, id: uuid()};
                await services.activity.create(newActivity);
                runInAction('create activity', () => {
                    this.activityRegistry.set(newActivity.id, newActivity);
                });  
                this.selectActivity(newActivity);
                this.setEditMode(false);            
            } catch (err) {
                console.error(err);
            }            
        }
        this.setSubmitting(false);
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

    @action openCreateForm = (id?: string) => {
        this.selectedActivity = id ? this.activityRegistry.get(id) : undefined;
        this.setEditMode(true);
    };
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

export default createContext(new ActivityStore());