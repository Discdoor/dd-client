import { GatewayWebsocketClient } from "../GatewayWebsocketClient";

/**
 * Registers relationship events.
 * @param client The client instance.
 */
export function registerMessagingEvents(client: GatewayWebsocketClient) {
    client.socket.on('message received', (message: unknown) => {
        // Check if UI state has channel/dm/gdm open

        // If not, put a badge or something
        // And play notification sound
        
    })
}