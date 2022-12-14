import * as React from 'react';
import { getAPIDefinitions } from '../../../api/APIProps';
import UserEntity from '../../../api/entities/UserEntity';
import ClientPage from '../../../pages/client/Client';
import UserPaneAction from './UserPaneAction';

/**
 * Client properties.
 */
interface UserPaneProps {
    /**
     * The active user for this pane.
     */
    user: UserEntity;

    /**
     * Client instance reference.
     */
    inst: ClientPage;

    /**
     * Initial pane content.
     */
    initialPaneContent?: React.ReactElement;
}

/**
 * User pane state.
 */
interface UserPaneState {
    paneContent: React.ReactElement;
}

/**
 * Represents the user panel layout.
 */
class UserPaneContainer extends React.Component<UserPaneProps, UserPaneState> {
    constructor(props: UserPaneProps) {
        super(props);

        this.state = {
            paneContent: props.initialPaneContent
        }
    }

    render() {
        return <div className='user-pane'>
            <div className='container'>
                { this.state.paneContent ?? '' }
            </div>
            <div className='user'>
                <div className='icon' style={{ backgroundImage: `url(${ getAPIDefinitions().cdn + this.props.user.avatarUrl})` }}></div>
                <div className='name-box'>
                    <div className='username'>{this.props.user.username}</div>
                    <div className='discrim'>#{this.props.user.discrim}</div>
                </div>
                <div className='actions'>
                    <UserPaneAction icon={getAPIDefinitions().cdn + "/assets/client/icons/24x24/settings.svg"} onclick={()=>this.props.inst.showSettingsUI()}></UserPaneAction>
                </div>
            </div>
        </div>
    }
}

export default UserPaneContainer;