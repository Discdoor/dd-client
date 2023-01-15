import * as React from "react";
import { getAPIDefinitions } from "../../../../../../api/APIProps";
import UserEntity from "../../../../../../api/entities/UserEntity";
import "../../../../../../style/client/layout/messaging/dm-user-info.scss";

/**
 * User info properties.
 */
interface DMUserInfoProps {
    /**
     * The user to display properties for.
     */
    user: UserEntity;
}

/**
 * Represents a DMUserInfo component.
 */
export class DMUserInfo extends React.Component<DMUserInfoProps> {
    constructor(props: DMUserInfoProps) {
        super(props);
    }

    render() {
        return <div className="dm-user-info">
            <div className="avatar" style={{ backgroundImage: `url(${getAPIDefinitions().cdn + this.props.user.avatarUrl})` }}></div>
            <div className="username">{this.props.user.username}</div>
            <div className="subtext">This is the beginning of your direct message history with <b>@{this.props.user.username}</b></div>
        </div>
    }
}