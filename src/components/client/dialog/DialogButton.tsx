import * as React from 'react';

interface DialogButtonProps {
    /**
     * Dialog button label
     */
    label: string;

    /**
     * Dialog onclick function.
     */
    onclick: React.MouseEventHandler<HTMLButtonElement>;
}

class DialogButton extends React.Component<DialogButtonProps> {
    constructor(props: DialogButtonProps) {
        super(props);
    }

    render() {
        return <button onClick={this.props.onclick}>{this.props.label}</button>
    }
}

export default DialogButton