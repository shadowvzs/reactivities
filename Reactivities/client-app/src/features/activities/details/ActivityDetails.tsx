import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from 'semantic-ui-react'
import ActivityStore from "@stores/activityStore";
import { observer } from 'mobx-react-lite';
import LoadingComponent from "@layout/LoadingComponent";
import { RouteComponentProps, Link } from "react-router-dom";

type IParams = { id: string };
const ActivityDetails: React.FC<RouteComponentProps<IParams>> = ( { match, history }) => {
    const { activity, loadActivity, loadingInitial } = useContext(ActivityStore);

    useEffect(() => {
        loadActivity(match.params.id);
    }, [loadActivity, match.params.id]);

    if (loadingInitial || !activity) return <LoadingComponent content='Loading activity' />;

    const { id, category, city, date, description, title, venue } = activity || {};
    
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
                    <Button basic color='blue' content='Edit' as={Link} to={`/manage/${id}`}/>
                    <Button basic color='grey' content='Cancel' onClick={() => history.push('/activities')} />
                </Button.Group>
            </Card.Content>
        </Card>        
    );
};

export default observer(ActivityDetails);