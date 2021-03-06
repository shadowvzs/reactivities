import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Header, Button, Grid } from 'semantic-ui-react';
import RootStoreContext from "src/app/stores/rootStore";
import ProfileEditForm from "./ProfileEditForm";

const ProfileDescription: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, updateProfile } = rootStore.profileStore;
    const [editMode, setEditMode] = useState<boolean>(true);

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile!.username}`} />
                    { isCurrentUser && (
                        <Button 
                            floated='right' 
                            basic 
                            content={editMode ? 'Cancel' : 'Edit Profile'} 
                            onClick={() => setEditMode(!editMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    { editMode ? (
                        <ProfileEditForm
                            updateProfile={updateProfile}
                            profile={profile!}
                        />
                    ) : (
                        <span>{profile!.bio}</span>
                    )}
                      
                </Grid.Column>
            </Grid>        
        </Tab.Pane>
    );
};

export default observer(ProfileDescription);