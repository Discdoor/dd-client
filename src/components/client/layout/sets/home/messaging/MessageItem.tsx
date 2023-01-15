import * as React from "react";
import { getAPIDefinitions } from "../../../../../../api/APIProps";
import UserEntity from "../../../../../../api/entities/UserEntity";
import "../../../../../../style/client/layout/messaging/dm-user-info.scss";

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
            {this.props.content}
        </div>
    }
}