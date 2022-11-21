import * as React from 'react';
import { getAPIDefinitions } from '../../../api/APIProps';
import UserEntity from '../../../api/entities/UserEntity';
import UserPaneAction from './UserPaneAction';

/**
 * Client properties.
 */
interface UserPaneProps {
    /**
     * The active user for this pane.
     */
    user: UserEntity;
}

/**
 * Represents the user panel layout.
 */
class UserPaneContainer extends React.Component<UserPaneProps> {
    constructor(props: UserPaneProps) {
        super(props);
    }

    render() {
        return <div className='user-pane'>
            <div className='container'>

            </div>
            <div className='user'>
                <div className='icon' style={{ backgroundImage: `url(${ getAPIDefinitions().cdn + this.props.user.avatarUrl})` }}></div>
                <div className='name-box'>
                    <div className='username'>{this.props.user.username}</div>
                    <div className='discrim'>#{this.props.user.discrim}</div>
                </div>
                <div className='actions'>
                    <UserPaneAction icon={getAPIDefinitions().cdn + "/assets/client/icons/24x24/settings.svg"} onclick={()=>{}}></UserPaneAction>
                </div>
            </div>
        </div>
    }
}

export default UserPaneContainer;