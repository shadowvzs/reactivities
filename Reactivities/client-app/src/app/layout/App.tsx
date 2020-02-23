import React, { useState, useEffect } from "react";
import { Container } from 'semantic-ui-react'
import NavBar from "@features/nav/NavBar";
import LoadingComponent from "@layout/LoadingComponent";
import ActivityDashboard from "@features/activities/dashboard/ActivityDashboard";
import { IActivity } from "@models/Activity";
import services from "@service";
import { v4 as uuid } from "uuid";


const App: React.FC = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [target, setTarget] = useState<string>('');

    useEffect(() => {
        services.activity.list().then(list => {
            const activityList = (list || []).map(x => ({ ...x, date: x.date.split('.')[0] }));
            setActivities(activityList);
            if (activityList.length) setSelectedActivity(activityList[0]);
        }).then(() => setLoading(false));
    }, []);

    const openCreateForm = () => {
        setSelectedActivity(undefined);
        setEditMode(true);
    };

    const selectDetail = (activity?: IActivity) => {
        setEditMode(false);
        setSelectedActivity(activity);
    };

    const onCreateOrEdit = (activity: IActivity) => {
        const activityList: IActivity[] = [...activities];
        setSubmitting(true);
        if (activity.id) {
            const existingActivity = activityList.find(x => x.id === activity.id) as IActivity;
            if (!existingActivity) return;            
            services.activity.update(existingActivity).then(() => {
                Object.assign(existingActivity, activity);
                setSelectedActivity(existingActivity);
                setActivities(activityList);
                setEditMode(false);
            }).finally(() => {
                setSubmitting(false);
            });
        } else {
            // temporary because we must save into db
            const newActivity: IActivity = {...activity, id: uuid()};
            services.activity.create(newActivity).then(() => {
                activityList.push(newActivity);
                setSelectedActivity(newActivity);
                setActivities(activityList);
                setEditMode(false);
            }).finally(() => {
                setSubmitting(false);
            });
        }
    };

    const onDelete = (ev: React.SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(ev.currentTarget.name);
        services.activity.delete(id).then(() => {
            setActivities([...activities].filter(x => x.id !== id));
        });
    };

    if (loading) return <LoadingComponent content='Loading activities' />;

    return (
        <>
            <NavBar openCreateForm={openCreateForm} />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard 
                    activities={activities}
                    selectedActivity={selectedActivity}
                    setSelectedActivity={selectDetail}
                    target={target}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    onCreateOrEdit={onCreateOrEdit}
                    onDelete={onDelete}
                    submitting={submitting}
                />
            </Container>
        </>
    );
}

export default App;
