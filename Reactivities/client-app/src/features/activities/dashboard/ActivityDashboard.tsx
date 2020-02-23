import React from "react";
import { IActivity } from "@models/Activity";
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface ActivityDashboardProps {
    activities: IActivity[];
    selectedActivity: IActivity;
    editMode: boolean;
    setEditMode: (arg0: boolean) => void;
    setSelectedActivity: (arg0: IActivity) => void;
    onCreateOrEdit: (arg0: IActivity) => void;
    onDelete: (id: string) => void;
}

const ActivityDashboard: React.FC<ActivityDashboardProps> = (props) => {
    const {
        activities,
        selectedActivity,
        editMode,
        setEditMode,
        setSelectedActivity,
        onCreateOrEdit,
        onDelete
    } = props;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList 
                    activities={activities}
                    setSelectedActivity={setSelectedActivity}
                    onDelete={onDelete}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                { selectedActivity && !editMode && (
                    <ActivityDetails 
                        {...selectedActivity} 
                        setSelectedActivity={setSelectedActivity} 
                        setEditMode={setEditMode} 
                    />
                )}
                { editMode && (
                    <ActivityForm 
                        key={selectedActivity ? selectedActivity.id : 0}
                        setEditMode={setEditMode} 
                        activity={selectedActivity} 
                        onCreateOrEdit={onCreateOrEdit} 
                    />
                )}
            </Grid.Column>
        </Grid>
    )
};

export default ActivityDashboard;
