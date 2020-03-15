import React from "react";
import { List, Image, Popup } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { IAttendee } from "@models/Activity";

interface Props {
    attendees: IAttendee[];
}

const ActivityList: React.FC<Props> = ({ attendees }) => {
    
    return (
        <List horizontal>
            { attendees.map((x) => (
                <List.Item key={x.username}>
                    <Popup 
                        header={x.displayName}
                        trigger={<Image size='mini' circular src={x.image || '/assets/user.png'} />}
                    />
                </List.Item>
            ))}
        </List>
    );
};

export default observer(ActivityList);
