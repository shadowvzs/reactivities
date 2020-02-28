import React, { useContext } from "react";
import { Button, Label, Item, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import ActivityStore from "@stores/activityStore";
import { Link } from "react-router-dom";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
    
    const { activitiesByDate } = useContext(ActivityStore);

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
