import * as React from 'react';
import "../../style/ui/components/textbox.scss";

/**
 * Field options.
 */
class FieldOptions {
    /**
     * The field identifier.
     */
    ident: string;

    /**
     * The name of the field.
     */
    name: string;

    /**
     * The field option type.
     */
    type: string;

    /**
     * The default value.
     */
    defaultValue?: string = "";
}

/**
 * Field state interface.
 */
interface FieldState {
    /**
     * The value of the field.
     */
    value: string;
}

/**
 * Represents a checkbox component.
 */
 class FormField extends React.Component<FieldOptions, FieldState> {
    constructor(props: FieldOptions) {
        super(props);

        this.state = {
            value: props.defaultValue
        };

        this.changeState = this.changeState.bind(this);
    }

    changeState(event: React.ChangeEvent<HTMLInputElement>) {
        this.state = {
            value: event.target.value
        };
    }

    render() {
        return <div className='field'>
            <div className="name">{this.props.name}</div>
            <input name={this.props.ident} type={this.props.type} onChange={this.changeState}></input>
        </div>
    }
}

export default FormField