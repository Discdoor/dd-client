import * as React from 'react';
import FormField from '../../components/basic/Field';
import "../../style/page/login.scss";
import "../../style/ui/common.scss";
import "../../style/ui/components/form.scss";
import "../../style/ui/components/button.scss";
import { getAPIDefinitions } from '../../api/APIProps';
import FormErrorProvider from '../../components/basic/FormErrorProvider';
import { APIResponse } from '../../api/APIResponse';
import { SessionEntity } from '../../api/entities/SessionEntity';

const AUTH_LOGIN_ENDPOINT = `${getAPIDefinitions().gwServer + "/auth/login"}`;

/**
 * The user login page.
 */
class LoginPage extends React.Component {
    // Refs
    private emailRef = React.createRef<FormField>();
    private passwordRef = React.createRef<FormField>();
    private buttonRef = React.createRef<HTMLButtonElement>();
    private errorBoxRef = React.createRef<FormErrorProvider>();

    constructor(props: {}) {
        super(props);

        this.processLogin = this.processLogin.bind(this);
    }

    /**
     * Processes the login.
     */
    async processLogin() {
        this.buttonRef.current.disabled = true;
        this.errorBoxRef.current.setVisibility(false);

        const loginReq = await fetch(AUTH_LOGIN_ENDPOINT, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                email: this.emailRef.current.state.value,
                password: this.passwordRef.current.state.value
            })
        });

        const response: APIResponse<SessionEntity> = await loginReq.json();

        if(!loginReq.ok || !response.success) {
            // Display error box
            this.errorBoxRef.current.setVisibility(true);
            this.errorBoxRef.current.setMessage(response.message || "API Error");
            this.buttonRef.current.disabled = false;
            return;
        }

        // Put session key in localstorage and open client
        localStorage.setItem("sessKey", response.data.key);

        // Go to app url
        window.location.href = "/app";

        this.buttonRef.current.disabled = false;
    }

    render() {
        return <div className="login-page">
        <div className="box creds">
            <div className="title">Sign in</div>
            <div className="subtitle">Please enter your account details.</div>
            <div className="form">
                <FormField ident="email" name="Email" type="email" ref={this.emailRef}></FormField>
                <FormField ident="password" name="Password" type="password" ref={this.passwordRef}></FormField>
                <button className="submit" onClick={this.processLogin} ref={this.buttonRef}>Login</button>
                <FormErrorProvider ref={this.errorBoxRef}></FormErrorProvider>
                <p>
                    No account yet? <a href="/signup">Sign up now!</a>
                </p>
            </div>
        </div>
    </div>
    }
}

export default LoginPage