import * as React from 'react';
import SubView, { GenericSubviewProps } from "./SubView";
import "../../../style/client/subviews/settings.scss";
import AccountSettingsPage from './settings/AccountPage';
import { getAPIDefinitions } from '../../../api/APIProps';

/**
 * Settings subview.
 * TODO implement fully
 */
export default class SettingsSubView extends SubView {
    constructor(props: GenericSubviewProps) {
        super(props);
    }

    render() {
        return <div className="subview settings">
            <div className='menu'>
                <div className='label'>USER SETTINGS</div>
                <div className='item active'>Account</div>
            </div>
            <div className='content'>
                <div className='closeBtn' onClick={()=>this.props.inst.closeSubview()} style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/dlg-close.svg"})` }}></div>
                <AccountSettingsPage inst={this.props.inst}></AccountSettingsPage>
            </div>
        </div>
    }
}