import React from "react";
import { Button, Label, Item, Segment, Icon } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IActivity } from "@models/Activity";

interface ActivityListItemProps {
    activity: IActivity;
}

const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity }) => {
    
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={`/assets/categoryImages/${activity.category}.jpg`} />
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
                <Icon name='clock' /> {format(activity.date!, 'h:mm a')}
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
