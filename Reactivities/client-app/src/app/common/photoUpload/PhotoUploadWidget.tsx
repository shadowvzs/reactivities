import React, { useState, useEffect } from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import PhotoWidgetCropper from './PhotoWidgetCropper';

interface IFile extends File {
    preview: string;
}

interface IProps {
    uploadPhoto: (file: Blob) => void;
    loading: boolean;
}

export const PhotoUploadWidget: React.FC<IProps> = ({ uploadPhoto, loading }) => {
    
    const [files, setFiles] = useState<IFile[]>([]);
    const [image, setImage] = useState<Blob | null>(null);

    useEffect(() => {
        // useEffect executed when dom is already insert so we can revoke the object url at this moment
        files.forEach(file => URL.revokeObjectURL(file.preview))
    }, files);

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header color='teal' sub content='Step 1 - Add Photo' />
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 2 - Resize image' />
                {!!files.length && (
                    <PhotoWidgetCropper 
                        setImage={setImage} 
                        imagePreview={files[0].preview}
                    />
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 3 - Preview & Upload' />
                {!!files.length && (
                    <>
                        <div 
                            style={{ minHeight: 200, overflow: 'hidden' }}
                            className='img-preview' 
                        />
                        <Button.Group width={2}>
                            <Button 
                                positive 
                                icon='check' 
                                loading={loading} 
                                disabled={!image} 
                                onClick={() => uploadPhoto(image!)} 
                            />
                            <Button 
                                icon='close' 
                                loading={loading} 
                                onClick={() => setFiles([])} 
                            />                            
                        </Button.Group>
                    </>
                )}                
            </Grid.Column>
        </Grid>
    )
};

export default observer(PhotoUploadWidget);