/**
 * Represents an empty response.
 */
interface APIGenericResponse {}

/**
 * Represents an API response.
 */
interface APIResponse<T> {
    /**
     * Success state.
     */
    success: boolean;

    /**
     * API error code.
     */
    code: number;
    /**
     * Response string.
     */
    message: string;

    /**
     * Response data.
     */
    data?: T;
}

export {
    APIResponse
}