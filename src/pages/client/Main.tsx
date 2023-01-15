import * as React from 'react';
import { performAPIRequest } from '../../api/APIFetch';
import { getAPIDefinitions } from '../../api/APIProps';
import "../../style/client/client.scss";
import InitPage from './Init';
import ClientPage from './Client';
import UserEntity from '../../api/entities/UserEntity';
import { GatewayWebsocketClient } from '../../client/GatewayWebsocketClient';

interface ClientIState {
    /**
     * Current client page.
     */
    page: JSX.Element;
}

class MainClientPage extends React.Component<{}, ClientIState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            page: <InitPage></InitPage>,
        }
    }

    async componentDidMount(): Promise<void> {
        // Check if session is valid
        const response = await performAPIRequest<UserEntity>(getAPIDefinitions().gwServer + "/auth/user/@me", "GET", {});

        if(!response.success) {
            // Send user back to login page - login failed
            localStorage.removeItem("sessKey");
            window.location.href = "/login";
            return;
        }

        // Establish WS connection
        const wsClient = new GatewayWebsocketClient(getAPIDefinitions().gwServerWS);

        // Check connection
        const wsBegun = await wsClient.begin();

        if(!wsBegun) {
            // Inform user connection has failed
            alert("Web socket connection has failed - client has not been authenticated.");
            return;
        }

        // Show the client.
        this.setState({
            page: <ClientPage ws={wsClient} user={response.data}></ClientPage>,
        });
    }

    render() {
        return this.state.page;
    }
}

export default MainClientPage