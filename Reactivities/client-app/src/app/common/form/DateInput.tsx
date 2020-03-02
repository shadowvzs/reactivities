import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets';

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateInput: React.FC<IProps> = (props) => {
    const {
        id,
        input, 
        date = false,
        time = false,
        width,
        placeholder,
        meta: { touched, error },
        ...rest
    } = props;
    return (
        <Form.Field error={touched && !!error} width={width}>
            <DateTimePicker 
                date={date}
                time={time}
                placeholder={placeholder}
                value={input.value || null}
                onKeyDown={e => e.preventDefault()}
                onBlur={input.onBlur}
                onChange={input.onChange}
                {...rest}
            />
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    );
};

export default DateInput;