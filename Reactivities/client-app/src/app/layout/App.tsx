import React, { useEffect, useContext } from "react";
import { Container } from 'semantic-ui-react'
import NavBar from "@features/nav/NavBar";
import ActivityDashboard from "@features/activities/dashboard/ActivityDashboard";
import ActivityForm from "@features/activities/form/ActivityForm";
import ActivityDetails from "@features/activities/details/ActivityDetails";
import HomePage from "@features/home/HomePage";
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from "react-router-dom";

// NOTE: issue if we are in edit form and click toc reate form then form not reseted
//        because not was unmounted and keep the state
// because of this we use key prop with location.key on route

// anyting which start wityh / and have something after it

// <Route exact path="/(.+)" render={() => <SubComponents/> } />
const App: React.FC<RouteComponentProps> = ({ location }) => {

    return (
        <>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/(.+)" render={() => (
                <>
                    <NavBar />
                    <Container style={{ marginTop: '7em' }}>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/activities" component={ActivityDashboard} />
                        <Route path="/activities/:id" component={ActivityDetails} />
                        <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                    </Container>
                </>
            )} />
        </>
    );
}

export default withRouter(observer(App));
