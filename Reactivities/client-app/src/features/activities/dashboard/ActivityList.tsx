import React from "react";
import { IActivity } from "@models/Activity";
import { Button, Label, Item, Segment } from 'semantic-ui-react'

type ItemProps = IActivity & Pick<ActivityDashboardProps, 'setSelectedActivity' | 'onDelete'>;
const ActivityItem: React.FC<ItemProps> = ({ onDelete, setSelectedActivity, ...activity }) => {
    const { id, category, city, date, description, title, venue } = activity;
    return (
        <Item>
            <Item.Content>
                <Item.Header as='a'>{title}</Item.Header>
                <Item.Meta>{date}</Item.Meta>
                <Item.Description>
                    <div>{ description }</div>
                    <div>{city}, {venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button floated='right' content='View' color='blue' onClick={() => setSelectedActivity(activity)} />
                    <Button floated='right' content='Delete' color='red' onClick={() => onDelete(id)} />
                    <Label basic content={category} />
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};

interface ActivityDashboardProps {
    activities: IActivity[];
    setSelectedActivity: (arg0: IActivity) => void;
    onDelete: (id: string) => void;
}

const ActivityList: React.FC<ActivityDashboardProps> = ({ activities, onDelete, setSelectedActivity }) => {

    return (
        <Segment clearing>
            <Item.Group divided>
                { activities.map(x => <ActivityItem key={x.id} {...x} onDelete={onDelete} setSelectedActivity={setSelectedActivity} />)}
            </Item.Group>
        </Segment>
    );
};

export default ActivityList;
