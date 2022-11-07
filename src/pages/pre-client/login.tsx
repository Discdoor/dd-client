import * as React from 'react';
import FormField from '../../components/basic/Field';
import "../../style/page/login.scss";
import "../../style/ui/common.scss";

const LoginPage = () => {
    return <div className="login-page">
        <div className="box creds">
            <div className="title">Sign in</div>
            <div className="subtitle">Please enter your account details.</div>
            <form className="login-form" method="POST" action="/auth/login">
                <FormField ident="username" name="Username" type="normal"></FormField>
                <FormField ident="password" name="Password" type="password"></FormField>
            </form>
        </div>
    </div>
}

export default LoginPage