import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const TextInput: React.FC<IProps> = (props) => {
    const {
        input, 
        width,
        type,
        placeholder,
        meta: { touched, error }
    } = props;
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            <input 
                {...input} 
                placeholder={placeholder} 
            />
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    );
};

export default TextInput;