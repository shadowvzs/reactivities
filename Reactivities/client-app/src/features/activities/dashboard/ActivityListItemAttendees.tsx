import React from "react";
import { List, Image, Popup } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { IAttendee } from "@models/Activity";

interface Props {
    attendees: IAttendee[];
}

const followingStyle = {
    borderColor: 'orange',
    borderWidth: 2
};

const ActivityList: React.FC<Props> = ({ attendees }) => {
    
    return (
        <List horizontal>
            { attendees.map((x) => (
                <List.Item key={x.username}>
                    <Popup 
                        header={x.displayName}
                        trigger={(
                            <Image 
                                size='mini' 
                                circular 
                                src={x.image || '/assets/user.png'} 
                                bordered
                                style={x.following ? followingStyle : undefined}
                            />
                        )}
                    />
                </List.Item>
            ))}
        </List>
    );
};

export default observer(ActivityList);
