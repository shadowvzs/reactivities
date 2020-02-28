import React from "react";
import { Button, Label, Item, Segment, Icon } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import { IActivity } from "@models/Activity";

interface ActivityListItemProps {
    activity: IActivity;
}

/*
    const activityStore = useContext(ActivityStore);
    const { target, submitting, onDelete } = activityStore;

                    <Button 
                        name={activity.id}
                        loading={target === activity.id && submitting} 
                        floated='right' 
                        content='Delete' 
                        color='red' 
                        onClick={(e) => onDelete(e, activity.id as string)} 
                    />
*/

const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity }) => {
    
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/placeholder.png' />
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted by Pista
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {activity.date}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendess will go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    floated='right' 
                    content='View' 
                    color='blue' 
                    as={Link} 
                    to={`/activities/${activity.id}`} 
                />
            </Segment>
        </Segment.Group>
    );
};

export default observer(ActivityListItem);
