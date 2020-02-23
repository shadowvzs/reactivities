import React, { useState, useEffect } from "react";
import { Container } from 'semantic-ui-react'
import NavBar from "@features/nav/NavBar";
import ActivityDashboard from "@features/activities/dashboard/ActivityDashboard";
import { IActivity } from "@models/Activity";
import { API_URL } from "@configs";
import axios from "axios";
import { v4 as uuid } from "uuid";


const App: React.FC = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity>(undefined);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        axios.get<IActivity[]>(API_URL + 'activities').then((response) => {
            const activityList = (response.data || []).map(x => ({ ...x, date: x.date.split('.')[0] }));
            setActivities(activityList);
            if (activityList.length) setSelectedActivity(activityList[0]);
        })
    }, []);

    const openCreateForm = () => {
        setSelectedActivity(undefined);
        setEditMode(true);
    };

    const selectDetail = (activity: IActivity) => {
        setEditMode(false);
        setSelectedActivity(activity);
    };

    const onCreateOrEdit = (activity: IActivity) => {
        const activityList: IActivity[] = [...activities];
        let newActivity: IActivity;
        if (activity.id) {
            newActivity = activityList.find(x => x.id === activity.id);
            if (newActivity) Object.assign(newActivity, activity);
        } else {
            // temporary because we must save into db
            newActivity = {...activity, id: uuid()};
            activityList.push(newActivity);
        }
        setActivities(activityList);
        setEditMode(false);
        setSelectedActivity(newActivity);
    };

    const onDelete = (id: string) => {
        setActivities([...activities].filter(x => x.id !== id));
    }

    return (
        <>
            <NavBar openCreateForm={openCreateForm} />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard 
                    activities={activities}
                    selectedActivity={selectedActivity}
                    setSelectedActivity={selectDetail}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    onCreateOrEdit={onCreateOrEdit}
                    onDelete={onDelete}
                />
            </Container>
        </>
    );
}

export default App;
