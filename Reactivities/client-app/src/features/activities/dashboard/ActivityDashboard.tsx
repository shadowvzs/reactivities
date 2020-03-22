import React, { useEffect, useState, useContext } from "react";
import { Grid, Button, Loader } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import LoadingComponent from "@layout/LoadingComponent";
import RootStoreContext from "@stores/rootStore";
import InfiniteScroll from 'react-infinite-scroller';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';

const ActivityDashboard = () => {

    const { activityStore } = useContext(RootStoreContext);
    const { loadingInitial, loadActivities, setPage, page, totalPages } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    if (loadingInitial && page === 0) return <LoadingComponent content='Loading activities' />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && (page + 1 !== totalPages)}
                    initialLoad={false}
                >
                    <ActivityList />
                </InfiniteScroll>
            </Grid.Column>
            <Grid.Column width={6}> 
                <ActivityFilters />
            </Grid.Column>
            <Grid.Column width={6}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityDashboard);
