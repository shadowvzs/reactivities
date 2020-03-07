import React, { useContext } from "react";
import { Label, Item } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import RootStoreContext, { RootStore } from "@stores/rootStore";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
    
    const rootStore = useContext<RootStore>(RootStoreContext);
    const { activitiesByDate } = rootStore.activityStore;

    return (
        <>
            {activitiesByDate.map(([group, activities]) => (
                <React.Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>
                    <Item.Group divided>
                        { activities.map(x => <ActivityListItem key={x.id} activity={x} /> )}
                    </Item.Group>
                </React.Fragment>
            ))};
        </>
    );
};

export default observer(ActivityList);
