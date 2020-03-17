import React, { useRef } from 'react'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IProps {
    imagePreview: string;
    setImage: (image: Blob) => void;
}

const PhotoWidgetCropper: React.FC<IProps> = ({ setImage, imagePreview }) => {

    const cropper = useRef<Cropper>(null);
    const cropImage = () => {
        const elem = cropper.current;
        if (elem && typeof elem.getCroppedCanvas() === 'undefined') {
            return;
        }

        elem && elem.getCroppedCanvas().toBlob((blob: any) => {
            setImage(blob);
        }, 'image/jpeg');
    }

    return (
        <Cropper
            ref={cropper as any}
            src={imagePreview}
            style={{height: 200, width: '100%'}}
            // Cropper.js options
            preview='.img-preview'
            aspectRatio={1 / 1}
            guides={false}
            viewMode={1}
            dragMode='move'
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            crop={cropImage} 
        />
    );
}

export default PhotoWidgetCropper;