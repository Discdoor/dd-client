import * as React from 'react';
import FormField from '../../components/basic/Field';
import "../../style/page/login.scss";
import "../../style/ui/common.scss";
import "../../style/ui/components/form.scss";
import "../../style/ui/components/button.scss";
import { getAPIDefinitions } from '../../api/APIProps';
import Checkbox from '../../components/basic/Checkbox';
import DateField from '../../components/basic/DateField';
import { APIResponse } from '../../api/APIResponse';
import FormErrorProvider from '../../components/basic/FormErrorProvider';
import { SessionEntity } from '../../api/entities/SessionEntity';

const AUTH_SIGNUP_ENDPOINT = `${getAPIDefinitions().gwServer + "/auth/register"}`;

class SignupPage extends React.Component {
    // Refs
    private emailRef = React.createRef<FormField>();
    private passwordRef = React.createRef<FormField>();
    private usernameRef = React.createRef<FormField>();
    private tosRef = React.createRef<Checkbox>();
    private dobRef = React.createRef<DateField>();
    private buttonRef = React.createRef<HTMLButtonElement>();
    private errorBoxRef = React.createRef<FormErrorProvider>();

    constructor(props: {}) {
        super(props);
        this.processRegister = this.processRegister.bind(this);
    }

    /**
     * Processes the registration.
     */
    async processRegister() {
        // Check if user has accepted the ToS
        if(!this.tosRef.current.state.checked) { 
            this.errorBoxRef.current.setVisibility(true);
            this.errorBoxRef.current.setMessage("You did not accept the terms and conditions!")
            return; // TODO use proper dialog
        }

        this.buttonRef.current.disabled = true;
        this.errorBoxRef.current.setVisibility(false);

        const registerReq = await fetch(AUTH_SIGNUP_ENDPOINT, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                email: this.emailRef.current.state.value,
                password: this.passwordRef.current.state.value,
                username: this.usernameRef.current.state.value,
                dob: this.dobRef.current.state.value
            })
        });

        const response: APIResponse<SessionEntity> = await registerReq.json();

        if(!registerReq.ok || !response.success) {
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
            <div className="title">Create an account</div>
            <div className="form">
                <FormField ident="username" name="Username" type="text" ref={this.usernameRef}></FormField>
                <FormField ident="email" name="Email" type="email" ref={this.emailRef}></FormField>
                <FormField ident="password" name="Password" type="password" ref={this.passwordRef}></FormField>
                <DateField name="Date of Birth" ref={this.dobRef}></DateField>
                <Checkbox label="I agree to the terms and conditions." checked={false} ref={this.tosRef}></Checkbox>
                <button className="submit" onClick={this.processRegister} ref={this.buttonRef}>Register</button>
                <FormErrorProvider ref={this.errorBoxRef}></FormErrorProvider>
                <p>
                    Have an account already? <a href="/login">Log In here</a>
                </p>
            </div>
        </div>
    </div>
    }
}

export default SignupPage