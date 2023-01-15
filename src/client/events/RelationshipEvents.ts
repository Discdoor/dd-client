import { getAPIDefinitions } from "../../api/APIProps";
import { ClientContext, UIState } from "../ClientContext";
import { GatewayWebsocketClient } from "../GatewayWebsocketClient";

/**
 * Registers relationship events.
 * @param client The client instance.
 */
export function registerRelationshipEvents(client: GatewayWebsocketClient) {
    // On incoming request
    client.socket.on('friend request incoming', (user) => {
        console.log(`Friend request received from ${user.username}#${user.discrim}`);
        // Play notification sound
        new Audio(getAPIDefinitions().cdn + "/assets/client/sounds/notification.mp3").play();

        // Update UI relevant to friends
        UIState.updateFriendUIElements();
    });

    // State changes
    // They have been kept specific in future scenarios where we might want to handle each of these differently.
    client.socket.on('friend accept successful', (user) => UIState.updateFriendUIElements());
    client.socket.on('friend retract successful', (user) => UIState.updateFriendUIElements());
    client.socket.on('friend deny successful', (user) => UIState.updateFriendUIElements());
    client.socket.on('friend request retracted', (user) => UIState.updateFriendUIElements());
    client.socket.on('removed as friend', (user) => UIState.updateFriendUIElements());
    client.socket.on('friend remove successful', (user) => UIState.updateFriendUIElements());
    client.socket.on('block added', (user) => UIState.updateFriendUIElements());
    client.socket.on('blocked', (user) => UIState.updateFriendUIElements());

    // When the users request was accepted by the target user
    client.socket.on('friend request accepted', (user) => {
        // Play notification sound
        new Audio(getAPIDefinitions().cdn + "/assets/client/sounds/notification.mp3").play();

        // Simply update the UI
        UIState.updateFriendUIElements();
    });
}