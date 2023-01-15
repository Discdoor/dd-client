import * as React from 'react';
import { performAPIRequest } from '../../../../../api/APIFetch';
import { getAPIDefinitions } from '../../../../../api/APIProps';
import { UserRelationship } from '../../../../../api/entities/UserRelationEntity';
import { ClientContext } from '../../../../../client/ClientContext';
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

interface HomeUserPaneState {
    friendsItemBadgeCounter: number;
}

/**
 * Represents the layout for the server bar.
 */
class HomeUserPane extends React.Component<HomeUserPaneProps, HomeUserPaneState> {
    constructor(props: HomeUserPaneProps) {
        super(props);

        this.state = {
            friendsItemBadgeCounter: 0
        }
    }

    refreshCounters() {
        performAPIRequest<UserRelationship[]>(getAPIDefinitions().gwServer + "/user/relations/@me/incoming", "GET", "").then((v) => {
            if(!v.success)
                return;

            this.setState({ friendsItemBadgeCounter: v.data.length });
        });
    }

    componentDidMount(): void {
        this.refreshCounters();
        ClientContext.uiStates.homeUserPane = this;
    }

    componentWillUnmount(): void {
        ClientContext.uiStates.homeUserPane = null;
    }

    render() {
        return <div className='home-pane'>
            {/* Sub pane controls */}
            <HomeUserPaneSection activeId='friends' name="top" items={[
                { id: "friends", badgeCounter: this.state.friendsItemBadgeCounter, label: "Friends", onclick: ()=>this.props.inst.setContentPane(<FriendsPane inst={this.props.inst}></FriendsPane>), icon: getAPIDefinitions().cdn + "/assets/client/icons/24x24/friends.svg" },
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