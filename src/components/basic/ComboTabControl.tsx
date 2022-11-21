import * as React from 'react';
import "../../style/ui/components/combo-tab-ctl.scss";

/**
 * Represents a tab control page.
 */
interface TabControlPage {
    id: string;
    name: string;
    content: React.ReactElement;
}

/**
 * Tab control action.
 */
interface TabControlAction {
    id: string;
    icon: string;
    action: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * Represents the tab control props.
 */
interface TabControlProps {
    pages: TabControlPage[];
    actions: TabControlAction[];
    icon: string;
    title: string;
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
class ComboTabControl extends React.Component<TabControlProps, TabControlState> {
    /**
     * Tab control class name. For extensibility purposes.
     */
    private _clsName = "ui-tab-ctl-view";

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
            <div className='header'>
                <div className='ident'>
                    <div className='icon' style={{ backgroundImage: `url(${this.props.icon})` }}></div>
                    <div className='title'>{this.props.title}</div>
                </div>
                <div className="buttons">
                    {this.props.pages.map(x => <div onClick={()=>this.setActiveTab(x.id)} key={x.id} className={'page' + ((this.state.activeTabId == x.id) ? ' active' : '')}>{x.name}</div>)}
                </div>
                <div className='spacer'></div>
                <div className='actions'>
                    {this.props.actions.map(x => <div key={x.id} className='action' onClick={x.action}></div>)}
                </div>
            </div>
            <div className="content">
                {(this.state.activeTabId != null) ? this.props.pages.find(x => x.id == this.state.activeTabId).content : ''}
            </div>
        </div>
    }
}

export default ComboTabControl