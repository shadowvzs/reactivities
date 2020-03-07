import React, { useContext } from "react";
import { Form, Button, Label } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import RootStoreContext from "@stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "@common/form/TextInput";
import { IUserFormValues } from "@models/User";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from "revalidate";

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password'),
});

const LoginForm: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    return (
        <FinalForm 
            validate={validate}
            onSubmit={(values: IUserFormValues) => login(values).catch(err => ({
                [FORM_ERROR]: err
            }))}
            render={({ handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Field 
                        name='email' 
                        placeholder='Email' 
                        component={TextInput} 
                    />
                    <Field 
                        name='password' 
                        placeholder='Password' 
                        type='password'
                        component={TextInput} 
                    />
                    {submitError && !dirtySinceLastSubmit && <Label color='red' basic content={submitError.statusText} />}
                    <br />
                    <Button 
                        positive 
                        loading={submitting}
                        type='submit' 
                        content='Login' 
                        disabled={pristine || invalid}
                    />
                    <pre>{JSON.stringify(form.getState())}</pre>
                </Form>
            )}
        />
    );
};

export default observer(LoginForm);