import { io, Socket } from "socket.io-client";
import { registerRelationshipEvents } from "./events/RelationshipEvents";

/**
 * Core socket events (client -> server)
 */
interface CoreSocketEventsC2S {
    /* .. */
}

/**
 * Core socket events (server -> client).
 */
interface CoreSocketEventsS2C {
    /* .. */
}

/**
 * Bidirectional events.
 */
interface InterServerEvents {
    wsEcho: ()=> void;
}

/**
 * Represents a gateway websocket client.
 */
export class GatewayWebsocketClient {
    /**
     * Underlying socket.
     */
    public socket: Socket;

    /**
     * Creates a new gateway websocket client with the specified URL.
     * @param socketUrl The URL to use.
     */
    constructor(socketUrl: string) {
        this.socket = io(socketUrl);

        this.registerEvents();
    }

    /**
     * Register socket events.
     */
    registerEvents() {
        registerRelationshipEvents(this);
        
        // Disconnect event
        this.socket.on('disconnect', () => {
            // Handle disconnect
            alert("WS has been disconnected!");
        });
    }

    /**
     * Begins the connection.
     */
    begin(): Promise<boolean> {
        return new Promise((resolve) => {
            const sessKey = localStorage.getItem('sessKey');

            if(sessKey == null)
                resolve(false);
                
            this.socket.once('user client accepted', () => resolve(true));
            this.socket.once('user client rejected', () => resolve(false));
            this.socket.emit('user client begin', sessKey);
        });
    }
}