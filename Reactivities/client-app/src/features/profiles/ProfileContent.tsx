import React from 'react';
import { Tab } from 'semantic-ui-react';
import { IProfile } from "src/app/models/Profile";
import ProfileActivities from "./ProfileActivities";
import ProfilePhone from "./ProfilePhoto";
import ProfileDescription from "./ProfileDescription";
import ProfileFollowings from "./ProfileFollowings";

interface IProps {
    profile: IProfile;
    setActiveTab: (tabIndex: any) => void;
}

const panes = [
    {
        menuItem: 'About',
        render: () => <ProfileDescription />
    },
    {
        menuItem: 'Photos',
        render: () => <ProfilePhone />
    },
    {
        menuItem: 'Activities',
        render: () => <ProfileActivities />
    },
    {
        menuItem: 'Followers',
        render: () => <ProfileFollowings />
    },
    {
        menuItem: 'Following',
        render: () => <ProfileFollowings />
    },
];

const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {

    return (
        <Tab
            menu={{ fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
    );
};

export default ProfileContent;