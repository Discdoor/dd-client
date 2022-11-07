import * as React from 'react';
import FormField from '../../components/basic/Field';
import "../../style/page/login.scss";
import "../../style/ui/common.scss";
import "../../style/ui/components/form.scss";
import "../../style/ui/components/button.scss";
import { getAPIDefinitions } from '../../api/APIProps';

const AUTH_LOGIN_ENDPOINT = `${getAPIDefinitions().authServer + "/auth/login"}`;

// TODO probably clear endpoint

class LoginPage extends React.Component {
    // Refs
    private emailRef = React.createRef<FormField>();
    private passwordRef = React.createRef<FormField>();

    constructor(props: {}) {
        super(props);

        this.processLogin = this.processLogin.bind(this);
    }

    /**
     * Processes the login.
     */
    async processLogin() {
        const loginReq = await fetch(AUTH_LOGIN_ENDPOINT, {
            body: JSON.stringify({
                email: this.emailRef.current.state.value,
                password: this.passwordRef.current.state.value
            })
        });


    }

    render() {
        return <div className="login-page">
        <div className="box creds">
            <div className="title">Sign in</div>
            <div className="subtitle">Please enter your account details.</div>
            <div className="form">
                <FormField ident="email" name="Email" type="email" ref={this.emailRef}></FormField>
                <FormField ident="password" name="Password" type="password" ref={this.passwordRef}></FormField>
                <button className="submit" onClick={this.processLogin}>Login</button>
                <p>
                    No account yet? <a href="/signup">Sign up now!</a>
                </p>
            </div>
        </div>
    </div>
    }
}

export default LoginPage