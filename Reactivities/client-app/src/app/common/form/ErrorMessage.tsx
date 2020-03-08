
import React from 'react';
import { Message } from 'semantic-ui-react';
import { AxiosResponse } from 'axios';

interface IProps {
    error: AxiosResponse,
    text?: string;
}

const ErrorMessage: React.FC<IProps> = (props) => {
    const {
        error,
        text
    } = props;
    const errorList = error.data && Object.values(error.data.errors) as any;

    return (
        <Message negative>
            <Message.Header>{error.statusText}</Message.Header>
            {errorList.length && (
                <Message.List>
                    {errorList.flat().map((err: string, i: number) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
            {text && <Message.Content content={text} />}
        </Message>  
    );
};

export default ErrorMessage;

 