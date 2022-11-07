interface APIDefinitions {
    /**
     * Authentication server URL.
     */
    authServer: string;

    /**
     * CDN server URL.
     */
    cdn: string;
}

/**
 * Returns a list of APIs.
 */
export function getAPIDefinitions() : APIDefinitions {
    return require('../../config/apis.json');
}
