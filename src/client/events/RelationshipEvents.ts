import { getAPIDefinitions } from "../../api/APIProps";
import { ClientContext, UIState } from "../ClientContext";
import { GatewayWebsocketClient } from "../GatewayWebsocketClient";

/**
 * Registers relationship events.
 * @param client The client instance.
 */
export function registerRelationshipEvents(client: GatewayWebsocketClient) {
    client.socket.on('friend request incoming', (user) => {
        console.log(`Friend request received from ${user.username}#${user.discrim}`);
        // Play notification sound
        new Audio(getAPIDefinitions().cdn + "/assets/client/sounds/notification.mp3").play();

        // Update UI relevant to friends
        UIState.updateFriendUIElements();
    });
}