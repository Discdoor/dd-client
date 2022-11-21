import * as React from 'react';
import Tooltip from '../../basic/Tooltip';

/**
 * Guild bar item props.
 */
interface GuildBarItemProps {
    name: string;

    icon: string;

    onclick: Function;
}

/**
 * Guild bar item state.
 */
interface GuildBarItemState {
    tooltipShown: boolean
}

/**
 * Represents a checkbox component.
 */
class GuildBarItem extends React.Component<GuildBarItemProps, GuildBarItemState> {
    private targetX: number = 0;
    private targetY: number = 0;

    constructor(props: GuildBarItemProps) {
        super(props);
        
        this.state = {
            tooltipShown: false
        }

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
        this.setState({ tooltipShown: true });
        
        const TOOLTIP_HEIGHT = 33;

        // Get bounding rect for item
        let target = event.target as HTMLDivElement;
        let rect = target.getBoundingClientRect();

        this.targetX = rect.x + rect.width + 10;
        this.targetY = rect.y + ((rect.height / 2) - (TOOLTIP_HEIGHT / 2));
    }

    onMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
        this.setState({ tooltipShown: false });
    }

    render() {
        return <div className='item' style={{ backgroundImage: `url(${this.props.icon})` }} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            { this.state.tooltipShown ? <Tooltip label={this.props.name} arrowDirection="left" x={this.targetX} y={this.targetY}></Tooltip> : '' }
        </div>
    }
}

export default GuildBarItem