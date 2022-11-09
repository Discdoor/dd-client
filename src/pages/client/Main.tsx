import * as React from 'react';
import { performAPIRequest } from '../../api/APIFetch';
import { getAPIDefinitions } from '../../api/APIProps';
import "../../style/client/client.scss";
import InitPage from './Init';
import ClientPage from './Client';
import UserEntity from '../../api/entities/UserEntity';

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
        } else {
            // Show the main client component
            this.setState({
                page: <ClientPage user={response.data}></ClientPage>,
            });
        }
    }

    render() {
        return this.state.page;
    }
}

export default MainClientPage