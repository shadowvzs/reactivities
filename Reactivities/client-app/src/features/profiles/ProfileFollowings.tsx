import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import RootStoreContext from "src/app/stores/rootStore";
import ProfileCard from './ProfileCard';

const ProfileFollowings = () => {

    const rootStore = useContext(RootStoreContext);
    const { profile, followings, loading, activeTab } = rootStore.profileStore;
    return (
        <Tab.Pane loading={loading}>
        <Grid>
            <Grid.Column width={16}>
            <Header
                floated='left'
                icon='user'
                content={
                    activeTab === 3
                        ? `People following ${profile!.displayName}`
                        : `People ${profile!.displayName} is following`
                }
            />
            </Grid.Column>
            <Grid.Column width={16}>
            <Card.Group itemsPerRow={5}>
                { followings.map(x => ( <ProfileCard key={x.username} profile={x} /> ))}
            </Card.Group>
            </Grid.Column>
        </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfileFollowings);