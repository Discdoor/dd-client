import * as React from 'react';
import { GenericSubviewProps } from "../SubView";
import "../../../../style/client/subviews/settings/account-settings.scss";
import UserBox from './AccountPage/UserBox';
import Dialog from '../../dialog/Dialog';
import DialogButton from '../../dialog/DialogButton';
import FormField from '../../../basic/Field';
import FormErrorProvider from '../../../basic/FormErrorProvider';
import { performAPIRequest } from '../../../../api/APIFetch';
import UserEntity from '../../../../api/entities/UserEntity';
import { getAPIDefinitions } from '../../../../api/APIProps';

/**
 * Settings subview.
 */
export default class AccountSettingsPage extends React.Component<GenericSubviewProps> {
    private errorBoxRef = React.createRef<FormErrorProvider>();
    private dialogRef = React.createRef<Dialog>();
    private pwdNew = React.createRef<FormField>();
    private pwdNewConfirm = React.createRef<FormField>();

    constructor(props: GenericSubviewProps) {
        super(props);
    }

    render() {
        return <div className='account-settings'>
            <div className='title'>Account Settings</div>
            <div className='section'>
                <UserBox user={this.props.inst.state.user}></UserBox>
            </div>

            <div className='separator'></div>
            
            <div className='title'>Password</div>
            <div className='section'>
                <button onClick={()=>this.props.inst.getDialogManager().current.showDialog(<Dialog ref={this.dialogRef} key="pwd" title="Change your password" content={<div className='form'>
                    <FormField ref={this.pwdNew} name="New Password" ident='new' type='password'></FormField>
                    <FormField ref={this.pwdNewConfirm} name="Confirm New Password" ident='confirm' type='password'></FormField>
                    <FormErrorProvider ref={this.errorBoxRef}></FormErrorProvider>
                </div>} buttons={[
                    <DialogButton key="cancel" label="Cancel" onclick={()=>{
                        this.props.inst.getDialogManager().current.closeDialog("pwd");
                    }}></DialogButton>,
                    <DialogButton key="ok" label="OK" onclick={async()=>{
                        // Verify change
                        this.errorBoxRef.current.setVisibility(false);

                        // First step: ensure all fields are filled
                        for(let f of [this.pwdNew, this.pwdNewConfirm])
                            if(!f.current.state.value || (f.current.state.value.trim() == ""))
                                return;

                        // Second step: Check if new password and confirmed new password are the same
                        if(this.pwdNew.current.state.value !== this.pwdNewConfirm.current.state.value) {
                            this.errorBoxRef.current.setVisibility(true);
                            this.errorBoxRef.current.setMessage("Error: new password was not confirmed correctly.");
                            return;
                        }

                        // Third step: change
                        const response = await performAPIRequest<UserEntity>(getAPIDefinitions().gwServer + "/auth/user/@me", "PATCH", {
                            password: this.pwdNew.current.state.value 
                        });

                        if(!response.success) {
                            this.errorBoxRef.current.setVisibility(true);
                            this.errorBoxRef.current.setMessage(response.message);
                        }
                        else
                            this.props.inst.getDialogManager().current.closeDialog("pwd");
                    }}></DialogButton>
                ]}></Dialog>)}>Change Password</button>
            </div>
        </div>
    }
}