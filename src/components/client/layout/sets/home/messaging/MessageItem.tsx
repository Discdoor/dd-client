import * as React from "react";
import { getAPIDefinitions } from "../../../../../../api/APIProps";
import UserEntity from "../../../../../../api/entities/UserEntity";
import "../../../../../../style/client/layout/messaging/message-item.scss";

/**
 * User info properties.
 */
interface MessageItemProps {
    /**
     * Message date.
     */
    date: Date;

    /**
     * Message content.
     */
    content: string;

    /**
     * Author.
     */
    author: UserEntity;
}

/**
 * Represents a MessageItem component.
 */
export class MessageItem extends React.Component<MessageItemProps> {
    constructor(props: MessageItemProps) {
        super(props);
    }

    render() {
        return <div className="message-item">
            <div className="left">
                <div className="avatar" style={{ backgroundImage: `url(${getAPIDefinitions().cdn + this.props.author.avatarUrl})` }}></div>
            </div>
            <div className="right">
                <div className="header">
                    <div className="username">{this.props.author.username}</div>
                    <div className="date">{(this.props.date as any) as string}</div>
                </div>
                <div className="message">{this.props.content}</div>
            </div>
        </div>
    }
}