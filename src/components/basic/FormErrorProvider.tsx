import * as React from 'react';
import "../../style/ui/components/form.scss";

/**
 * Field state interface.
 */
interface ErrorBoxState {
    /**
     * The error message.
     */
    message: string;
}

/**
 * Represents a checkbox component.
 */
class FormErrorProvider extends React.Component<{}, ErrorBoxState> {
    private boxRef = React.createRef<HTMLDivElement>();
    
    constructor(props: {}) {
        super(props);

        this.state = {
            message: ""
        };
    }

    /**
     * Sets the error message.
     * @param msg The message to set.
     */
    setMessage(msg: string) {
        this.setState({
            message: msg
        })
    }

    /**
     * Sets whether the error box should be visible.
     * @param visible The flag.
     */
    setVisibility(visible: boolean) {
        if(visible)
            this.boxRef.current.classList.add('active');
        else
            this.boxRef.current.classList.remove('active');
    }

    render() {
        return <div className='error-box' ref={this.boxRef}>
            <div className='message'>{this.state.message}</div>
        </div>
    }
}

export default FormErrorProvider