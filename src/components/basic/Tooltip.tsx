import * as React from 'react';
import "../../style/ui/components/tooltip.scss";

/**
 * Checkbox options object.
 */
interface UITooltipOptions {
    /**
     * Tooltip label.
     */
    label: string;

    /**
     * Arrow direction.
     */
    arrowDirection: "left" | "right" | "top" | "bottom";

    /**
     * X position of tooltip.
     */
    x?: number;

    /**
     * Y position of tooltip.
     */
    y?: number;
}

/**
 * UI tooltip state.
 */
interface UITooltipState {
    /**
     * X position of tooltip.
     */
    x: number;

    /**
     * Y position of tooltip.
     */
    y: number;
}

/**
 * Represents a checkbox component.
 */
class Tooltip extends React.Component<UITooltipOptions, UITooltipState> {
    constructor(props: UITooltipOptions) {
        super(props);

        this.state = {
            x: props.x ?? 0,
            y: props.y ?? 0
        };
    }

    render() {
        return <div className={"ui-tooltip arrow-" + this.props.arrowDirection} style={{ left: `${this.state.x}px`, top: `${this.state.y}px` }}>
            {this.props.label}
        </div>
    }
}

export default Tooltip