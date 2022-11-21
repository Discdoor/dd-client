import * as React from 'react';
import { getAPIDefinitions } from '../../../../../../api/APIProps';
import ComboTabControl from '../../../../../basic/ComboTabControl';

/**
 * Server discovery pane.
 */
class ServerDiscoveryPane extends React.Component<{}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return <div className='home-content server-disc'>
            <ComboTabControl title="Server Discovery" icon={getAPIDefinitions().cdn + "/assets/client/icons/24x24/server-discovery.svg"} startingPageId='new' pages={[
                { id: "new", name: "New", content: <div>todo new servers</div> },
                { id: "top", name: "Top", content: <div>todo top servers</div> }
            ]} actions={[]}></ComboTabControl>
        </div>
    }
}

export default ServerDiscoveryPane;