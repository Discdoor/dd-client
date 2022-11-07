import * as React from 'react';
import FormField from '../../components/basic/Field';
import "../../style/page/login.scss";
import "../../style/ui/common.scss";
import "../../style/ui/components/form.scss";
import "../../style/ui/components/button.scss";

const LoginPage = () => {
    return <div className="login-page">
        <div className="box creds">
            <div className="title">Sign in</div>
            <div className="subtitle">Please enter your account details.</div>
            <div className="form">
                <FormField ident="username" name="Email" type="email"></FormField>
                <FormField ident="password" name="Password" type="password"></FormField>
                <button className="submit">Login</button>
                <p>
                    No account yet? <a href="/signup">Sign up now!</a>
                </p>
            </div>
        </div>
    </div>
}

export default LoginPage