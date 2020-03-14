import React, { useContext, useEffect } from "react";
import RootStoreContext, { RootStore } from "@stores/rootStore";
import { observer } from 'mobx-react-lite';
import LoadingComponent from "@layout/LoadingComponent";
import { RouteComponentProps } from "react-router-dom";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import { Grid } from "semantic-ui-react";

type IParams = { id: string };
const ActivityDetails: React.FC<RouteComponentProps<IParams>> = ( { match }) => {
 
    const rootStore = useContext<RootStore>(RootStoreContext);
    const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);

    if (loadingInitial) return <LoadingComponent content='Loading activity' />;

    if (!activity) return <h2>Activity not found</h2>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar attendees={activity.attendees} />
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDetails);