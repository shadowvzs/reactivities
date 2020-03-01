import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label, Select } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}

const SelectInput: React.FC<IProps> = (props) => {
    const {
        input, 
        width,
        options,
        placeholder,
        meta: { touched, error }
    } = props;
    return (
        <Form.Field error={touched && !!error} width={width}>
            <Select 
                value={input.value}
                onChange={(e, data) => input.onChange(data.value)}
                options={options}
                placeholder={placeholder} 
            />
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    );
};

export default SelectInput;