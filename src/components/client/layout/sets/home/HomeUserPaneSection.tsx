import * as React from 'react';

interface HomeUserPaneItem {
    /**
     * The label of this item.
     */
    label: string;

    /**
     * The icon URL.
     */
    icon: string;

    /**
     * Identifier.
     */
    id: string;

    /**
     * Onclick listener.
     */
    onclick: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * Home user pane section props.
 */
interface HomeUserPaneSectionProps {
    name: string;
    items: HomeUserPaneItem[];
    activeId?: string;
    activateOnClick?: boolean;
}

/**
 * Home user pane section state.
 */
interface HomeUserPaneSectionState {
    activeId: string;
}

/**
 * Home user pane section.
 */
class HomeUserPaneSection extends React.Component<HomeUserPaneSectionProps, HomeUserPaneSectionState> {
    constructor(props: HomeUserPaneSectionProps) {
        super(props);

        this.state = {
            activeId: props.activeId
        }
    }

    /**
     * Sets the active button.
     * @param id The button to make active.
     */
    setActiveButton(id: string) {
        this.setState({ activeId: id });
    }

    render() {
        return <div className={'section ' + this.props.name}>
            {
                this.props.items.map(x => <div key={x.id} className={'item' + ((this.state.activeId == x.id) ? ' active' : '')}
                    onClick={(e)=>{
                        if(this.props.activateOnClick)
                            this.setActiveButton(x.id);

                        x.onclick(e);
                    }}>
                        <div className='icon' style={{ backgroundImage: `url(${x.icon})` }}></div>
                        <div className='label'>{x.label}</div>
                </div>)
            }
        </div>
    }
}

export default HomeUserPaneSection