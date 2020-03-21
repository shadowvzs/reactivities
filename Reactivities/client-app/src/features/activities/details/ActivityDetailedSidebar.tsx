import React, { Fragment } from "react";
import { observer } from 'mobx-react-lite';
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IAttendee } from "@models/Activity";

interface Props {
    attendees: IAttendee[];
}

const ActivityDetailedSidebar: React.FC<Props> = ({ attendees }) => {

    return (
        <Fragment>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.map(x => (
                        <Item key={x.username} style={{ position: 'relative' }}>
                            { x.isHost && (
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='orange'
                                    ribbon='right'
                                >
                                    Host
                                </Label>
                            )}
                            <Image size='tiny' src={x.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profile/${x.username}`}>{x.displayName}</Link>
                                </Item.Header>
                                { x.following && <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra> }
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
      </Fragment>
    );
};

export default observer(ActivityDetailedSidebar);