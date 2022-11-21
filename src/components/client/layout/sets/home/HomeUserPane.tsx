import * as React from 'react';
import { getAPIDefinitions } from '../../../../../api/APIProps';
import "../../../../../style/client/layout/home/home-pane.scss";
import HomeUserPaneItem from './HomeUserPaneItem';

/**
 * Represents the layout for the server bar.
 */
class HomeUserPane extends React.Component<{}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return <div className='home-pane'>
            {/* Sub pane controls */}
            <div className='section top'>
                <HomeUserPaneItem label="Friends" onclick={()=>{}} icon={getAPIDefinitions().cdn + "/assets/client/icons/24x24/friends.svg"}></HomeUserPaneItem>
                <HomeUserPaneItem label="Server Discovery" onclick={()=>{}} icon={getAPIDefinitions().cdn + "/assets/client/icons/24x24/server-discovery.svg"}></HomeUserPaneItem>
            </div>
            {/* DM list */}
            <div className='title'>RECENTS</div>
            <div className='section dm'>
                
            </div>
        </div>
    }
}

export default HomeUserPane;