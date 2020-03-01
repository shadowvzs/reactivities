import React, { useState, useContext, useEffect } from "react";
import { IActivity } from "@models/Activity";
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import ActivityStore from "@stores/activityStore";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { category } from "@common/options/categoryOptions";
import TextInput from "@common/form/TextInput";
import TextAreaInput from "@common/form/TextAreaInput";
import SelectInput from "@common/form/SelectInput";


type IParams = { id: string };
const ActivityForm: React.FC<RouteComponentProps<IParams>> = ({ match, history }) => {
    
    const { 
        submitting, 
        activity, 
        loadActivity, 
        onCreateOrEdit, 
        clearActivity 
    } = useContext(ActivityStore);

    const [state, setState] = useState<IActivity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });
    
    useEffect(() => {
        if (match.params.id && !state.id) 
            loadActivity(match.params.id).then(() => {
                setState(activity!);
            });
        return () => clearActivity();
    }, [match.params.id, loadActivity]);

    const onSubmit = () => {
        onCreateOrEdit(state).then(x => {
            if (x) history.push(`/activities/${x.id}`);
        });
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm 
                        onSubmit={console.log}
                        render={({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field 
                                    name='title' 
                                    placeholder='Title' 
                                    value={state.title} 
                                    component={TextInput} 
                                />
                                <Field 
                                    name='description' 
                                    rows={3}
                                    placeholder='Description' 
                                    value={state.description} 
                                    component={TextAreaInput} 
                                />
                                <Field 
                                    name='category' 
                                    options={category}
                                    placeholder='Category' 
                                    value={state.category} 
                                    component={SelectInput} 
                                />
                                <Field 
                                    name='date' 
                                    placeholder='Date' 
                                    value={state.date} 
                                    component={TextInput} 
                                />
                                <Field 
                                    name='city' 
                                    placeholder='City' 
                                    value={state.city} 
                                    component={TextInput} 
                                />
                                <Field 
                                    name='venue' 
                                    placeholder='Venue' 
                                    value={state.venue} 
                                    component={TextInput} 
                                />
                                <Button floated='right' positive type='submit' content='Submit' loading={submitting} />
                                <Button floated='right' type='button' content='Cancel' onClick={() => history.push('/activities')} loading={submitting} />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityForm);