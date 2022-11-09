import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import LoginPage from './pages/pre-client/Login';
import SignupPage from './pages/pre-client/Signup';
import './style/app.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import IndexPage from './pages/static-main/Index';
import MainClientPage from './pages/client/Main';

const root = ReactDOM.createRoot(document.body.querySelector(".root"));

root.render(
    <Router>
      <div>
        <Routes>
          <Route path="/" element=<IndexPage />></Route>
          <Route path="/app" element=<MainClientPage />></Route>
          <Route path="/login" element=<LoginPage />></Route>
          <Route path="/signup" element=<SignupPage />></Route>
        </Routes>
      </div>
    </Router>
);
