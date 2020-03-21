import React, { useContext, useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { Grid } from "semantic-ui-react";
import RootStoreContext from "@stores/rootStore";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import LoadingComponent from "@layout/LoadingComponent";
import { RouteComponentProps } from "react-router-dom";

interface RouteParams {
    username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {

    const rootStore = useContext(RootStoreContext);
    const { profile, loadingProfile, loadProfile, setActiveTab } = rootStore.profileStore;

    useEffect(() => {
        loadProfile(match.params.username);
    }, [loadProfile, match]);

    if (loadingProfile) return <LoadingComponent content='Loading profile' />;

    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile!} />
                <ProfileContent profile={profile!} setActiveTab={setActiveTab} />
            </Grid.Column>
        </Grid>
    );
};

export default observer(ProfilePage);