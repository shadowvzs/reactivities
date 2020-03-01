import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const TextAreaInput: React.FC<IProps> = (props) => {
    const {
        input, 
        width,
        rows,
        placeholder,
        meta: { touched, error }
    } = props;
    return (
        <Form.Field error={touched && !!error} width={width}>
            <textarea 
                {...input} 
                placeholder={placeholder} 
                rows={rows} 
            />
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    );
};

export default TextAreaInput;