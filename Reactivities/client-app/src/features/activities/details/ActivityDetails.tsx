import React, { useContext, useEffect } from "react";
import ActivityStore from "@stores/activityStore";
import { observer } from 'mobx-react-lite';
import LoadingComponent from "@layout/LoadingComponent";
import { RouteComponentProps } from "react-router-dom";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import { Grid } from "semantic-ui-react";

type IParams = { id: string };
const ActivityDetails: React.FC<RouteComponentProps<IParams>> = ( { match, history }) => {
    const { activity, loadActivity, loadingInitial } = useContext(ActivityStore);

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);

    if (loadingInitial || !activity) return <LoadingComponent content='Loading activity' />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityDetails);