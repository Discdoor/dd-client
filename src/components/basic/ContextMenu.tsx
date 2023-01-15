import * as React from "react";
import "../../style/ui/components/context-menu.scss";

/**
 * Represents a context menu item.
 */
interface ContextMenuItem {
    /**
     * Item ID.
     */
    id: string;

    /**
     * The label of the item.
     */
    label: string;

    /**
     * Onclick handler.
     */
    onclick: Function;
}

/**
 * Context menu props.
 */
interface ContextMenuProps {
    items: ContextMenuItem[];
    x: number;
    y: number;
}

export class ContextMenuComponent extends React.Component<ContextMenuProps> {
    /**
     * Creates a new context menu element.
     * @param props The properties to use.
     */
    constructor(props: ContextMenuProps) {
        super(props);
    }

    render() {
        return <div className="ui-context-menu" style={{
            left: `${this.props.x}px`,
            top: `${this.props.y}px`
        }}>
            { this.props.items.map(x => <div className="option" onMouseUp={(e)=>{
                e.stopPropagation();
                x.onclick(); // execute handler
                destroyAllMenus();
            }} key={x.id}>{x.label}</div>) }
        </div>
    }
}

/**
 * Context menu container state.
 */
interface CtxMenuContainerState {
    menus: React.ReactElement<ContextMenuComponent>[]
}

/**
 * Active context menu container.
 */
let activeContainer: ContextMenuContainer = null;

export class ContextMenuContainer extends React.Component<{}, CtxMenuContainerState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            menus: []
        }

        activeContainer = this;
    }

    componentDidMount(): void {
        
    }

    /**
     * Pushes a new menu.
     * @param menu The menu to push.
     */
    pushMenu(menu: React.ReactElement<ContextMenuComponent>) {
        this.setState({
            ...this.state,
            ...{
                menus: [
                    ...this.state.menus,
                    ...[menu]
                ]
            }
        })
    }

    render() {
        return <div className="menu-layer">
            { this.state.menus }
        </div>
    }
}

/**
 * Creats a new context menu item.
 * @param items 
 */
function createMenu(items: ContextMenuItem[], x: number, y: number) {
    activeContainer.setState({ menus: [<ContextMenuComponent items={items} x={x} y={y} key={(activeContainer.state.menus.length + 1).toString()}></ContextMenuComponent>] });
}

/**
 * Destroys all menus.
 */
function destroyAllMenus() {
    activeContainer.setState({ menus: [] });
}

document.body.addEventListener('mouseup', ()=>{
    if(activeContainer.state.menus.length > 0)
        destroyAllMenus();
})

export const ContextMenuCreator = {
    createMenu,
    destroyAllMenus
}