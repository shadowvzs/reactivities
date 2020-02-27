import React, { useEffect, useContext } from "react";
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from "@layout/LoadingComponent";
import ActivityStore from "@stores/activityStore";

const ActivityDashboard = () => {

    const activityStore = useContext(ActivityStore);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities' />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);
