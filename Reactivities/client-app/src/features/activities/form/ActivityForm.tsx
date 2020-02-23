import React, { useState } from "react";
import { IActivity } from "@models/Activity";
import { Segment, Form, Button } from 'semantic-ui-react'

interface ActivityFormProps {
    activity?: IActivity;
    submitting: boolean;
    setEditMode: (arg0: boolean) => void;
    onCreateOrEdit: (arg0: IActivity) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ activity = {}, submitting, setEditMode, onCreateOrEdit }) => {

    const [state, setState] = useState<IActivity>({
        id: activity ? activity.id : undefined,
        title: activity.title || '',
        description: activity.description || '',
        category: activity.category || '',
        date: activity.date || '',
        city: activity.city || '',
        venue: activity.venue || ''
    });
    
    const onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        setState({ ...state, [name]: value });
    };

    const onSubmit = () => {
        onCreateOrEdit(state);
    };

    return (
        <Segment clearing>
            <Form onSubmit={onSubmit}>
                <Form.Input name='title' placeholder='Title' value={state.title} onChange={onChange} />
                <Form.TextArea name='description' rows={2} placeholder='Description' value={state.description} onChange={onChange} />
                <Form.Input name='category' placeholder='Category' value={state.category} onChange={onChange} />
                <Form.Input name='date' type='datetime-local' placeholder='Date' value={state.date} onChange={onChange} />
                <Form.Input name='city' placeholder='City' value={state.city} onChange={onChange} />
                <Form.Input name='venue' placeholder='Venue' value={state.venue} onChange={onChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={submitting} />
                <Button floated='right' type='button' content='Cancel' onClick={() => setEditMode(false)} loading={submitting} />
            </Form>
        </Segment>      
    );
};

export default ActivityForm;