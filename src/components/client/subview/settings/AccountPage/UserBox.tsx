import * as React from 'react';
import { getAPIDefinitions } from '../../../../../api/APIProps';
import UserEntity from '../../../../../api/entities/UserEntity';
import FormField from '../../../../basic/Field';
import UserBoxField from './UserBoxField';

interface UserBoxProps {
    /**
     * The user to edit.
     */
    user: UserEntity;
}

/**
 * Settings subview.
 */
export default class UserBox extends React.Component<UserBoxProps> {
    constructor(props: UserBoxProps) {
        super(props);
    }

    render() {
        return <div className='user-box'>
            <div className="info">
                <div className='avatar' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + this.props.user.avatarUrl})` }}></div>
                <div className='fields'>
                    <UserBoxField name="Username" value={`${this.props.user.username}#${this.props.user.discrim}`}></UserBoxField>
                    <UserBoxField name="Email" value={this.props.user.email}></UserBoxField>
                    <UserBoxField name="Phone" value={this.props.user.phone}></UserBoxField>
                </div>
            </div>
        </div>
    }
}