import React, { useContext } from "react";
import { Card, Image, Button } from 'semantic-ui-react'
import ActivityStore from "@stores/activityStore";
import { observer } from 'mobx-react-lite';

const ActivityDetails = () => {

    const { selectedActivity, cancelEditMode, openCreateForm } = useContext(ActivityStore);
    const { id, category, city, date, description, title, venue } = selectedActivity || {};

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
                    <Button basic color='blue' content='Edit' onClick={() => openCreateForm(id)}/>
                    <Button basic color='grey' content='Cancel' onClick={() => cancelEditMode()} />
                </Button.Group>
            </Card.Content>
        </Card>        
    );
};

export default observer(ActivityDetails);