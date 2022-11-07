import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import LoginPage from './pages/pre-client/Login';
import SignupPage from './pages/pre-client/Signup';
import './style/app.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
  
    //<LoginPage></LoginPage>

const root = ReactDOM.createRoot(document.body.querySelector(".root"));

root.render(
    <Router>
      <div>
        <Routes>
          <Route path="/login" element=<LoginPage />></Route>
          <Route path="/signup" element=<SignupPage />></Route>
        </Routes>
      </div>
    </Router>
);
