import React from "react";
import { Dimmer, Loader } from 'semantic-ui-react';


interface LoaderProps {
    inverted?: boolean;
    content?: string;
}

const LoadingComponent: React.FC<LoaderProps> = ({
    inverted = true,
    content
}) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    );
};

export default LoadingComponent;