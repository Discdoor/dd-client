import * as React from 'react';
import "../../style/ui/components/checkbox.scss";

/**
 * Checkbox options object.
 */
class UICheckboxOptions {
    /**
     * The checkbox label.
     */
    label: string;

    /**
     * Initial checkbox state.
     */
    checked: boolean = false;
}

/**
 * Checkbox state.
 */
interface CheckboxState {
    /**
     * Whether the checkbox is checked.
     */
    checked: boolean;
}

/**
 * Represents a checkbox component.
 */
class Checkbox extends React.Component<UICheckboxOptions, CheckboxState> {
    constructor(props: UICheckboxOptions) {
        super(props);

        this.state = {
            checked: this.props.checked
        };

        this.changeState = this.changeState.bind(this);
    }

    changeState() {
        this.state = {
            checked: !this.state.checked
        };
    }

    render() {
        return <div className="ui-checkbox">
            <input type="checkbox" defaultChecked={this.state.checked} onChange={this.changeState}></input>
            <span className='label'>{this.props.label}</span>
        </div>
    }
}

export default Checkbox