import * as React from 'react';
import "../../style/ui/components/tab-control.scss";

/**
 * Represents a tab control page.
 */
interface TabControlPage {
    id: string;
    name: string;
    content: React.ReactElement;
}

/**
 * Represents the tab control props.
 */
interface TabControlProps {
    pages: TabControlPage[];
    startingPageId?: string;
}

/**
 * Tab control state.
 */
interface TabControlState {
    activeTabId?: string;
}

/**
 * Represents a checkbox component.
 */
class TabControl extends React.Component<TabControlProps, TabControlState> {
    /**
     * Tab control class name. For extensibility purposes.
     */
    private _clsName = "ui-tab-ctl";

    constructor(props: TabControlProps) {
        super(props);

        this.state = {
            activeTabId: this.props.startingPageId
        }
    }

    /**
     * Sets the active tab.
     * @param id The ID of the tab to make active.
     */
    setActiveTab(id: string) {
        this.setState({ activeTabId: id });
    }

    render() {
        return <div className={this._clsName}>
            <div className="pages">
                {this.props.pages.map(x => <div key={x.id} className={'page' + ((this.state.activeTabId == x.id) ? ' active' : '')}>{x.name}</div>)}
            </div>
            <div className="content">
                {(this.state.activeTabId != null) ? this.props.pages.find(x => x.id == this.state.activeTabId).content : ''}
            </div>
        </div>
    }
}

export default TabControl