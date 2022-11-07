import * as React from 'react';
import FormField from '../../components/basic/Field';
import "../../style/page/login.scss"; // Use the same stylesheet for login - these pages are identical
import "../../style/ui/common.scss";
import "../../style/ui/components/form.scss";
import "../../style/ui/components/button.scss";
import Checkbox from '../../components/basic/Checkbox';

const SignupPage = () => {
    return <div className="login-page">
        <div className="box creds">
            <div className="title">Create an account</div>
            <div className="form">
                <FormField ident="email" name="Email" type="email"></FormField>
                <FormField ident="username" name="Username" type="text"></FormField>
                <FormField ident="password" name="Password" type="password"></FormField>
                <Checkbox label="I agree to the terms and conditions." checked={false}></Checkbox>
                <button className="submit">Login</button>
                <p>
                    Have an account already? <a href="/login">Log In here</a>
                </p>
            </div>
        </div>
    </div>
}

export default SignupPage