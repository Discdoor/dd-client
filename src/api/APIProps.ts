interface APIDefinitions {
    /**
     * Gateway server URL.
     */
    gwServer: string;

    /**
     * Gateway websocket URL.
     */
    gwServerWS: string;

    /**
     * CDN server URL.
     */
    cdn: string;
}

/**
 * Returns a list of APIs.
 */
export function getAPIDefinitions() : APIDefinitions {
    return require('../../data/apis.json');
}
