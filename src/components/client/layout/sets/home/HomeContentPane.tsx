import * as React from 'react';
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
class HomeContentPane extends React.Component<{}, HomeContentPaneState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            pane: "friends"
        }
    }

    render() {
        switch(this.state.pane) {
            case "friends":
                return <FriendsPane></FriendsPane>
        }
    }
}

export default HomeContentPane;