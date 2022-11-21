import * as React from 'react';

/**
 * Represents dialog parameters.
 */
interface DialogParams {
    /**
     * The title of the dialog.
     */
    title: string;

    /**
     * The dialog content
     */
    content: JSX.Element | string,

    /**
     * The dialog buttons.
     */
    buttons: JSX.Element[]
}

/**
 * Dialog window manager.
 */
class Dialog extends React.Component<DialogParams> {
    constructor(props: DialogParams) {
        super(props);
    }

    render() {
        return <div className='subcontainer'>
            <div className='dialog'>
                <div className='title'>{this.props.title}</div>
                <div className='content'>{this.props.content}</div>
                <div className='buttons'>
                    {this.props.buttons}
                </div>
            </div>
        </div>
    }
}

export default Dialog;