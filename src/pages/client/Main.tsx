import * as React from 'react';
import { performAPIRequest } from '../../api/APIFetch';
import { getAPIDefinitions } from '../../api/APIProps';
import "../../style/client/client.scss";
import InitPage from './Init';

const MainClientPage = () => {
    // Show init page

    // Run the checks asynchronously
    (async function() {
        // Check if session is valid
        const request = await performAPIRequest(getAPIDefinitions().gwServer + "/auth/session/validate", "POST", {});

        if(!request.success) {
            // Send user back to login page - login failed
            localStorage.removeItem("sessKey");
            window.location.href = "/login";
        } else {
            // Load the app
        }
    })();

    return <InitPage></InitPage>
}

export default MainClientPage