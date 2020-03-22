import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react';
import RootStoreContext from "src/app/stores/rootStore";
import PhotoUploadWidget from "src/app/common/photoUpload/PhotoUploadWidget";

const ProfilePhoto: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, uploadPhoto, uploadingPhoto, setMainPhoto, loading, deletePhoto } = rootStore.profileStore;
    const [addPhotoMode, setPhotoMode] = useState<boolean>(true);
    const [target, setTarget] = useState<string | undefined>(undefined);
    const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined);

    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => setPhotoMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                    <Header floated='left' icon='image' content='Photos' />
                    { isCurrentUser && (
                        <Button 
                            floated='right' 
                            basic 
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'} 
                            onClick={() => setPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    { addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto} />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile && profile.photos.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    { isCurrentUser && (
                                        <Button.Group fluid width={2}>
                                            <Button 
                                                loading={loading && target === photo.id} 
                                                basic 
                                                positive 
                                                disabled={photo.isMain}
                                                content='Main' 
                                                onClick={() => {
                                                    setTarget(photo.id);
                                                    setMainPhoto(photo);
                                                }} 
                                            />
                                            <Button 
                                                loading={loading && deleteTarget === photo.id}
                                                basic 
                                                negative 
                                                disabled={photo.isMain}
                                                icon='trash' 
                                                onClick={() => {
                                                    setDeleteTarget(photo.id);
                                                    deletePhoto(photo);
                                                }} 
                                            />
                                        </Button.Group>
                                    )}
                                </Card>
                            ))}
                        </Card.Group>  
                    )}
                      
                </Grid.Column>
            </Grid>        
        </Tab.Pane>
    );
};

export default observer(ProfilePhoto);