import { getAPIDefinitions } from "../../api/APIProps";
import { ClientContext, UIState } from "../ClientContext";
import { GatewayWebsocketClient } from "../GatewayWebsocketClient";

/**
 * Registers relationship events.
 * @param client The client instance.
 */
export function registerMessagingEvents(client: GatewayWebsocketClient) {
    client.socket.on('message received', (message: any) => {
        // Check if UI state has channel/dm/gdm open
        if(ClientContext.uiStates.messagingPane && (ClientContext.uiStates.messagingPane.props.channelId == message.channelId)) {
            // Push received message
            ClientContext.uiStates.messagingPane.pushMessage(message, true);
        } else
            new Audio(getAPIDefinitions().cdn + "/assets/client/sounds/notification.mp3").play();
    });
}