import React, { useState, useContext, useEffect } from "react";
import { IActivity } from "@models/Activity";
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import ActivityStore from "@stores/activityStore";
import { RouteComponentProps } from "react-router-dom";

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


    const onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        setState({ ...state, [name]: value });
    };

    const onSubmit = () => {
        onCreateOrEdit(state).then(x => {
            if (x) history.push(`/activities/${x.id}`);
        });
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <Form onSubmit={onSubmit}>
                        <Form.Input name='title' placeholder='Title' value={state.title} onChange={onChange} />
                        <Form.TextArea name='description' rows={2} placeholder='Description' value={state.description} onChange={onChange} />
                        <Form.Input name='category' placeholder='Category' value={state.category} onChange={onChange} />
                        <Form.Input name='date' type='datetime-local' placeholder='Date' value={state.date} onChange={onChange} />
                        <Form.Input name='city' placeholder='City' value={state.city} onChange={onChange} />
                        <Form.Input name='venue' placeholder='Venue' value={state.venue} onChange={onChange} />
                        <Button floated='right' positive type='submit' content='Submit' loading={submitting} />
                        <Button floated='right' type='button' content='Cancel' onClick={() => history.push('/activities')} loading={submitting} />
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityForm);