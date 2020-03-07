import React, { useEffect, useContext } from "react";
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from "@layout/LoadingComponent";
import RootStoreContext from "@stores/rootStore";

const ActivityDashboard = () => {

    const { activityStore } = useContext(RootStoreContext);
    const { loadingInitial, loadActivities } = activityStore;

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    if (loadingInitial) return <LoadingComponent content='Loading activities' />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);
