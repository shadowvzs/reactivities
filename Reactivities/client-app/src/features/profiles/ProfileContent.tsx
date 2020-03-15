import React from 'react';
import { observer } from 'mobx-react-lite';
import { Tab } from 'semantic-ui-react';
import { IProfile } from "@models/Profile";
import ProfilePhone from "./ProfilePhoto";

interface IProps {
    profile: IProfile;
}

const panes = [
    {
        menuItem: 'About',
        render: () => <Tab.Pane> About content </Tab.Pane>
    },
    {
        menuItem: 'Photos',
        render: () => <ProfilePhone />
    },
    {
        menuItem: 'Activities',
        render: () => <Tab.Pane> Activities content </Tab.Pane>
    },
    {
        menuItem: 'Followers',
        render: () => <Tab.Pane> Followers content </Tab.Pane>
    },
    {
        menuItem: 'Following',
        render: () => <Tab.Pane> Following content </Tab.Pane>
    },
];

const ProfileContent: React.FC<IProps> = () => {

    return (
        <Tab
            menu={{ fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
        />
    );
};

export default observer(ProfileContent);