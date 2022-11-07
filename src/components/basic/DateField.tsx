import * as React from 'react';

/**
 * Field properties.
 */
interface FieldProps {
    /**
     * Field name.
     */
    name: string;
}

/**
 * Field state interface.
 */
interface FieldState {
    /**
     * The value of the field.
     */
    value: number;
}

/**
 * Represents a checkbox component.
 */
 class DateField extends React.Component<FieldProps, FieldState> {
    constructor(props: FieldProps) {
        super(props);

        this.state = {
            value: 0
        };

        this.changeState = this.changeState.bind(this);
    }

    changeState(event: React.ChangeEvent<HTMLInputElement>) {
        this.state = {
            value: (event.target.valueAsDate != null) ? event.target.valueAsDate.getTime() : 0
        };
    }

    render() {
        return <div className='field'>
            <div className="name">{this.props.name}</div>
            <input type="date" onChange={this.changeState}></input>
        </div>
    }
}

export default DateField