import React from "react";
import ReactDOM from "react-dom";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import dateFnsLocalizer from 'react-widgets-date-fns';
import App from './app/layout/App'
import "react-toastify/dist/ReactToastify.min.css";
import 'react-widgets/dist/css/react-widgets.css';
import 'semantic-ui-css/semantic.min.css'
import "./app/layout/style.css";


export const history = createBrowserHistory();

dateFnsLocalizer();

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>
, document.getElementById("root"));
