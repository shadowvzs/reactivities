import React from "react";
import { Form, Header, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "@common/form/TextInput";
import { combineValidators, isRequired } from "revalidate";
import { IProfile } from "@models/Profile";
import TextAreaInput from "@common/form/TextAreaInput";

const validate = combineValidators({
    displayName: isRequired('displayName'),
});

interface IProps {
    profile: IProfile;
    updateProfile: (profile: IProfile) => void;
}

const ProfileEditForm: React.FC<IProps> = ({ profile, updateProfile }) => {

    return (
        <FinalForm 
            validate={validate}
            onSubmit={updateProfile}
            initialValues={profile}
            render={({ handleSubmit, submitting, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
                    <Field 
                        name='displayName' 
                        placeholder='Display Name' 
                        component={TextInput} 
                        value={profile!.displayName}
                    />
                    <Field 
                        name='bio'
                        value={profile.bio}
                        placeholder='Bio' 
                        rows={3}
                        component={TextAreaInput} 
                    />
                    <Button 
                        positive 
                        loading={submitting}
                        floated='right'
                        content='Update profile' 
                        disabled={pristine || invalid}
                    />
                </Form>
            )}
        />
    );
};

export default observer(ProfileEditForm);