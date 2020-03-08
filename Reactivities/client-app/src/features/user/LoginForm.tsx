import React, { useContext } from "react";
import { Form, Header, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import RootStoreContext from "@stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "@common/form/TextInput";
import { IUserFormValues } from "@models/User";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "@common/form/ErrorMessage";

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
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
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
                    {submitError && !dirtySinceLastSubmit && (
                       <ErrorMessage error={submitError} text={'Invalid username or password'} />
                    )}
                    <br />
                    <Button 
                        positive 
                        loading={submitting}
                        type='submit' 
                        content='Login' 
                        fluid
                        disabled={pristine || invalid}
                    />
                </Form>
            )}
        />
    );
};

export default observer(LoginForm);