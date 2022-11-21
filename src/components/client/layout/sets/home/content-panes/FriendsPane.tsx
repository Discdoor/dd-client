import * as React from 'react';
import { getAPIDefinitions } from '../../../../../../api/APIProps';
import ComboTabControl from '../../../../../basic/ComboTabControl';

/**
 * Friends pane.
 */
class FriendsPane extends React.Component<{}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return <div className='home-content friends'>
            <ComboTabControl title="Friends" icon={getAPIDefinitions().cdn + "/assets/client/icons/24x24/friends.svg"} startingPageId='all' pages={[
                { id: "online", name: "Online", content: <div>todo online users here</div> },
                { id: "all", name: "All", content: <div>todo all users here</div> },
                { id: "pending", name: "Pending", content: <div>todo all pending frqs here</div> },
                { id: "blocked", name: "Blocked", content: <div>todo all blocked frqs here</div> },
            ]} actions={[]}></ComboTabControl>
        </div>
    }
}

export default FriendsPane;