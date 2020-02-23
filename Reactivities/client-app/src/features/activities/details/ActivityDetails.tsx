import React from "react";
import { IActivity } from "@models/Activity";
import { Card, Image, Button } from 'semantic-ui-react'

type ItemProps = IActivity & { 
    setEditMode: (arg0: boolean) => void;
    setSelectedActivity: (arg0?: IActivity) => void; 
};
const ActivityDetails: React.FC<ItemProps> = ({ setEditMode, setSelectedActivity, ...activity }) => {
    const { category, city, date, description, title, venue } = activity;
    
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${category}.png`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                    <span>{date}</span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button basic color='blue' content='Edit' onClick={() => setEditMode(true)}/>
                    <Button basic color='grey' content='Cancel' onClick={() => setSelectedActivity(undefined)} />
                </Button.Group>
            </Card.Content>
        </Card>        
    );
};

export default ActivityDetails;