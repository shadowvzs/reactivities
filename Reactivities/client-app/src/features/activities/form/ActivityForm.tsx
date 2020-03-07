import React, { useState, useContext, useEffect } from "react";
import { ActivityFormValues, IActivity } from "@models/Activity";
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import RootStoreContext from "@stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { category } from "@common/options/categoryOptions";
import TextInput from "@common/form/TextInput";
import TextAreaInput from "@common/form/TextAreaInput";
import SelectInput from "@common/form/SelectInput";
import DateInput from "@common/form/DateInput";
import { combineDateAndTime } from "@common/util/util";
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from "revalidate";

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 character'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});

type IParams = { id: string };
const ActivityForm: React.FC<RouteComponentProps<IParams>> = ({ match, history }) => {
    
    const rootStore = useContext(RootStoreContext);
    const { submitting, loadActivity, onCreateOrEdit } = rootStore.activityStore;

    const [state, setState] = useState<ActivityFormValues>(new ActivityFormValues());
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        if (match.params.id && !state.id) {
            setLoading(true);
            loadActivity(match.params.id).then((activity) => {
                setState(new ActivityFormValues(activity));
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [match.params.id, loadActivity]);

    const onSubmit = (values: ActivityFormValues) => {
        const { date, time, ...rest } = values;
        const activity = { ...rest, date: combineDateAndTime(date!, time!) } as IActivity;
        onCreateOrEdit(activity);
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm 
                        validate={validate}
                        initialValues={state}
                        onSubmit={onSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
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
                                <Form.Group widths='equal'>
                                    <Field 
                                        date={true}
                                        name='date' 
                                        placeholder='Date' 
                                        value={state.date!} 
                                        component={DateInput} 
                                    />
                                    <Field 
                                        time={true}
                                        name='time' 
                                        placeholder='Time' 
                                        value={state.date!} 
                                        component={DateInput} 
                                    />                                    
                                </Form.Group>

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
                                <Button 
                                    disabled={loading || invalid || pristine}
                                    floated='right' 
                                    positive 
                                    type='submit' 
                                    content='Submit' 
                                    loading={submitting} 
                                />
                                <Button 
                                    disabled={loading}
                                    floated='right' 
                                    type='button' 
                                    content='Cancel' 
                                    onClick={() => history.push(state.id ? `/activities/${state.id}` : '/activities')} 
                                    loading={submitting} 
                                />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityForm);