import React, { useContext, Fragment, useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { Form as FinalForm, Field } from 'react-final-form';
import RootStoreContext, { RootStore } from "src/app/stores//rootStore";
import { Link } from "react-router-dom";
import TextAreaInput from "src/app/common/form/TextAreaInput";
import { formatDistance } from 'date-fns';

const ActivityDetailedChat: React.FC = () => {
    const rootStore = useContext<RootStore>(RootStoreContext);
    const { createHubConnection, stopHubConnection, addComment, activity } = rootStore.activityStore;

    useEffect(() => {
        createHubConnection(activity!.id!);
        return () => stopHubConnection();
    }, [createHubConnection, stopHubConnection, activity]);

    const comments = (activity && activity.comments) || [];

    return (
        <Fragment>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    { comments.map( x => (
                        <Comment key={x.id}>
                            <Comment.Avatar src={ x.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profile/${x.username}`}>{x.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{ formatDistance(new Date(x.createdAt), new Date()) }</div>
                                </Comment.Metadata>
                                <Comment.Text>{x.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
        
                    <FinalForm 
                        onSubmit={addComment} 
                        render={({ handleSubmit, submitting, form }) => (
                            <Form onSubmit={() => handleSubmit()!.then(()=> form.reset())}>
                                <Field 
                                    name='body'
                                    component={TextAreaInput}
                                    rows={2}
                                    placeholder={'Add your comment'}
                                />
                                <Button
                                    content='Add Reply'
                                    labelPosition='left'
                                    icon='edit'
                                    primary
                                    loading={submitting}
                                />
                            </Form>
                        )}
                    />
                </Comment.Group>
            </Segment>
        </Fragment>
    );
};

export default observer(ActivityDetailedChat);