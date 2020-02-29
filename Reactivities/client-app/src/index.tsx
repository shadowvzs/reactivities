import React from "react";
import ReactDOM from "react-dom";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './app/layout/App'
import "react-toastify/dist/ReactToastify.min.css";
import "./app/layout/style.css";

export const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>
, document.getElementById("root"));
