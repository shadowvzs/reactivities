import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import RootStoreContext, { RootStore } from "@stores/rootStore";
import { IActivity } from "@models/Activity";

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

interface HeaderProps {
    activity: IActivity;
}

const ActivityDetailedHeader: React.FC<HeaderProps> = ({ activity }) => {

    const host = activity.attendees.find(x => x.isHost);
    const rootStore = useContext<RootStore>(RootStoreContext);
    const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment basic style={activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date!, 'eeee do MMMM')}</p>
                                <p>
                                    Hosted by 
                                    <Link to={`/profile/${host?.username}`}><strong> {host?.displayName} </strong></Link>
                                </p>
                            </Item.Content>
                            </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                { activity.isHost ? (
                    <Button as={Link} to={`/manage/${activity.id}`} color='orange' floated='right'>
                        Manage Event
                    </Button>
                ) : activity.isGoing ? (
                    <Button loading={loading} onClick={cancelAttendance}>Cancel attendance</Button>
                ) : (
                    <Button loading={loading} color='teal' onClick={attendActivity}>Join Activity</Button>
                )}
          </Segment>
        </Segment.Group>
    );
};

export default observer(ActivityDetailedHeader);