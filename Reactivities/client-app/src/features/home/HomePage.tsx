import React, { useContext } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RootStoreContext from "src/app/stores/rootStore";
import LoginForm from "src/features/user/LoginForm";
import RegisterForm from "src/features/user/RegisterForm";

const HomePage = () => {
    const token = window.localStorage.getItem('jwt');
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
                <Container text>
                    <Header as='h1' inverted>
                        <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                        Reactivities
                    </Header>
                    {isLoggedIn && user && token ? (
                        <>
                            <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                            <Button as={Link} to='/activities' size='huge' inverted>
                                Go to activities!
                            </Button>
                        </>
                    ) : (
                        <>
                            <Header as='h2' inverted content='Welcome to Reactivities' />
                            <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
                                Login
                            </Button>
                            <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
                                Register
                            </Button>                                                       
                        </>
                    )}              
                </Container>
        </Segment>
    );
};

export default HomePage;