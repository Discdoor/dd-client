import * as React from 'react';
import { performAPIRequest } from '../../../../../api/APIFetch';
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
        this.uploadAvatar = this.uploadAvatar.bind(this);
    }

    uploadAvatar() {
        // Create file dialog
        const fpSelector = document.createElement('input');
        fpSelector.type = 'file';
        fpSelector.name = "file";
        fpSelector.style.display = "none";
        document.body.appendChild(fpSelector);

        fpSelector.addEventListener('change', async()=>{
            const data = new FormData();
            data.append('file', fpSelector.files[0]);
            fpSelector.remove();

            try {
                // TODO make api request to authorization manager
                // Auth mgr will then upload avatar to cdn
                const res = await performAPIRequest<UserEntity>(getAPIDefinitions().cdn + "/upload/avatars", "POST", data);

                if(!res.success) {
                    // Show error

                } else {
                    // Apply new profile picture

                }

                console.log(res);
            } catch(e) {
                console.error(e);
            }
        });

        fpSelector.click();
    }

    render() {
        return <div className='user-box'>
            <div className="info">
                <div className='avatar' onClick={this.uploadAvatar} style={{ backgroundImage: `url(${getAPIDefinitions().cdn + this.props.user.avatarUrl})` }}></div>
                <div className='fields'>
                    <UserBoxField name="Username" value={`${this.props.user.username}#${this.props.user.discrim}`}></UserBoxField>
                    <UserBoxField name="Email" value={this.props.user.email}></UserBoxField>
                    <UserBoxField name="Phone" value={this.props.user.phone}></UserBoxField>
                </div>
            </div>
        </div>
    }
}