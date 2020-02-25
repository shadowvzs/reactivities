import React, { useContext } from "react";
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '@features/activities/form/ActivityForm';
import ActivityStore from "@stores/activityStore";
import { observer } from 'mobx-react-lite';

const ActivityDashboard = () => {

    const { editMode, selectedActivity } = useContext(ActivityStore);

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                { selectedActivity && !editMode &&  <ActivityDetails /> }
                { editMode && <ActivityForm /> }
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);
