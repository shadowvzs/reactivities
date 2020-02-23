import React, { SyntheticEvent } from "react";
import { IActivity } from "@models/Activity";
import { Button, Label, Item, Segment } from 'semantic-ui-react'

interface ActivityDashboardProps {
    activities: IActivity[];
    submitting: boolean;
    target: string;
    setSelectedActivity: (arg0?: IActivity) => void;
    onDelete: (ev: SyntheticEvent<HTMLButtonElement>, id: string) => void;
}

const ActivityList: React.FC<ActivityDashboardProps> = ({ target, activities, submitting, onDelete, setSelectedActivity }) => {

    return (
        <Segment clearing>
            <Item.Group divided>
                { activities.map(x => (
                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>{x.title}</Item.Header>
                            <Item.Meta>{x.date}</Item.Meta>
                            <Item.Description>
                                <div>{x.description}</div>
                                <div>{x.city}, {x.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' onClick={() => setSelectedActivity(x)} />
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

export default ActivityList;
