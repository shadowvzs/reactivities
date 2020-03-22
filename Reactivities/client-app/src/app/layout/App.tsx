import React, { useEffect, useContext } from "react";
import { Container } from 'semantic-ui-react'
import NavBar from "src/features/nav/NavBar";
import ActivityDashboard from "src/features/activities/dashboard/ActivityDashboard";
import ActivityForm from "src/features/activities/form/ActivityForm";
import ActivityDetails from "src/features/activities/details/ActivityDetails";
import HomePage from "src/features/home/HomePage";
import ProfilePage from "src/features/profiles/ProfilePage";
import NotFound from "./NotFound";
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
import ModalContainer from "src/app/common/modal/ModalContainer";
import PrivateRoute from "./PrivateRoute";
import RootStoreContext from "src/app/stores/rootStore";
import LoadingComponent from "./LoadingComponent";

// NOTE: issue if we are in edit form and click toc reate form then form not reseted
//        because not was unmounted and keep the state
// because of this we use key prop with location.key on route

// anyting which start wityh / and have something after it

// <Route exact path="/(.+)" render={() => <SubComponents/> } />
const App: React.FC<RouteComponentProps> = ({ location }) => {

    const rootStore = useContext(RootStoreContext);
    const { appLoaded, setAppLoaded, token } = rootStore.commonStore;
    const { getUser } = rootStore.userStore;

    useEffect(() => {
        if (token) {
            getUser().finally(() => setAppLoaded());
        } else {
            setAppLoaded();
        }
    }, [getUser, setAppLoaded, token]);

    if (!appLoaded) 
        return <LoadingComponent content='Loading app...' />;

    return (
        <>
            <ModalContainer />
            <ToastContainer position='bottom-right' />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/(.+)" render={() => (
                <>
                    <NavBar />
                    <Container style={{ marginTop: '7em' }}>
                        <Switch>
                            <PrivateRoute exact path="/activities" component={ActivityDashboard} />
                            <PrivateRoute path="/activities/:id" component={ActivityDetails} />
                            <PrivateRoute key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                            <PrivateRoute path="/profile/:username" component={ProfilePage} />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </>
            )} />
        </>
    );
}

export default withRouter(observer(App));
