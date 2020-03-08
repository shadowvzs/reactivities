import React, { useContext } from "react";
import { Label, Item } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import RootStoreContext, { RootStore } from "@stores/rootStore";
import ActivityListItem from "./ActivityListItem";
import { format } from "date-fns";

const ActivityList = () => {
    
    const rootStore = useContext(RootStoreContext);
    const { activitiesByDate } = rootStore.activityStore;

    return (
        <>
            {activitiesByDate.map(([group, activities]) => (
                <React.Fragment key={group}>
                    <Label size='large' color='blue'>
                        {format(group, 'eeee do MMMM')}
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
