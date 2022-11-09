import { APIResponse } from "./APIResponse";

/**
 * Performs an API request.
 * @param url The URL of the request to make.
 * @param method The API method.
 * @param body The body to use.
 * @returns The response.
 */
export async function performAPIRequest<T>(url: string, method: string, body: any) : Promise<APIResponse<T>> {
    const sessionKey = localStorage.getItem("sessKey");

    const req = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...(sessionKey != null) ? { 'Authorization': 'Bearer ' + sessionKey } : {}
        },
        method,
        body: (method == "GET") ? null : JSON.stringify(body)
    });

    const response: APIResponse<T> = await req.json();

    if(!req.ok || !response.success) {
        return {
            success: false,
            code: response.code || req.status,
            message: response.message || "API Error"
        };
    }

    return response;
}