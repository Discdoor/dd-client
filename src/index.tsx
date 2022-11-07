import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import LoginPage from './pages/pre-client/login';
import './style/app.scss';

const root = ReactDOM.createRoot(document.body.querySelector(".root"));

root.render(
    <LoginPage></LoginPage>
);
