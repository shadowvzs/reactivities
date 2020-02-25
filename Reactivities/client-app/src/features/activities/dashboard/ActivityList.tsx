import React, { useContext } from "react";
import { Button, Label, Item, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import ActivityStore from "@stores/activityStore";

const ActivityList = () => {
    
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate, selectActivity, target, submitting, onDelete } = activityStore;

    return (
        <Segment clearing>
            <Item.Group divided>
                { activitiesByDate.map(x => (
                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>{x.title}</Item.Header>
                            <Item.Meta>{x.date}</Item.Meta>
                            <Item.Description>
                                <div>{x.description}</div>
                                <div>{x.city}, {x.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={() => selectActivity(x)} />
                                <Button 
                                    name={x.id}
                                    loading={target === x.id && submitting} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                    onClick={(e) => onDelete(e, x.id as string)} 
                                />
                                <Label basic content={x.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
};

export default observer(ActivityList);
