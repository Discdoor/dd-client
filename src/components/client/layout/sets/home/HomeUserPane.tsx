import * as React from 'react';
import { getAPIDefinitions } from '../../../../../api/APIProps';
import ClientPage from '../../../../../pages/client/Client';
import "../../../../../style/client/layout/home/home-pane.scss";
import FriendsPane from './content-panes/FriendsPane';
import ServerDiscoveryPane from './content-panes/ServerDiscoveryPane';
import HomeUserPaneSection from './HomeUserPaneSection';

interface HomeUserPaneProps {
    /**
     * Client page instance.
     */
    inst: ClientPage;
}

/**
 * Represents the layout for the server bar.
 */
class HomeUserPane extends React.Component<HomeUserPaneProps> {
    constructor(props: HomeUserPaneProps) {
        super(props);
    }

    render() {
        return <div className='home-pane'>
            {/* Sub pane controls */}
            <HomeUserPaneSection activeId='friends' name="top" items={[
                { id: "friends", label: "Friends", onclick: ()=>this.props.inst.setContentPane(<FriendsPane></FriendsPane>), icon: getAPIDefinitions().cdn + "/assets/client/icons/24x24/friends.svg" },
                { id: "server-discovery", label: "Server Discovery", onclick: ()=>this.props.inst.setContentPane(<ServerDiscoveryPane></ServerDiscoveryPane>), icon: getAPIDefinitions().cdn + "/assets/client/icons/24x24/server-discovery.svg" }
            ]} activateOnClick={true}></HomeUserPaneSection>
            {/* DM list */}
            <div className='title'>RECENTS</div>
            <div className='section dm'>
                
            </div>
        </div>
    }
}

export default HomeUserPane;