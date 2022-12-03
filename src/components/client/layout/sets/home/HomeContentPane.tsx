import * as React from 'react';
import ClientPage from '../../../../../pages/client/Client';
import "../../../../../style/client/layout/home/home-content.scss";
import FriendsPane from './content-panes/FriendsPane';

interface HomeContentPaneState {
    /**
     * The current pane ID.
     */
    pane: string;
}

/**
 * Represents the layout for the server bar.
 */
class HomeContentPane extends React.Component<{ inst: ClientPage }, HomeContentPaneState> {
    constructor(props: { inst: ClientPage }) {
        super(props);

        this.state = {
            pane: "friends"
        }
    }

    render() {
        switch(this.state.pane) {
            case "friends":
                return <FriendsPane inst={this.props.inst}></FriendsPane>
        }
    }
}

export default HomeContentPane;