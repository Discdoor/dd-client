import * as React from 'react';
import "../../../style/client/layout/dialog-mgr.scss";
import Dialog from './Dialog';
import DialogButton from './DialogButton';

/**
 * Dialog manager state.
 */
interface DialogMgrState {
    /**
     * The dialogs to display.
     */
    dialogs: React.ReactElement<Dialog>[];
}

/**
 * Dialog window manager.
 */
class DialogManager extends React.Component<{}, DialogMgrState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            dialogs: []
        }
    }

    /**
     * Shows the specified dialog.
     * @param dlg The dialog to show.
     */
    showDialog(dlg: React.ReactElement<Dialog>) {
        this.state.dialogs.push(dlg);

        this.setState({
            dialogs: this.state.dialogs 
        });
    }

    /**
     * Creates a simple alert.
     * @param title The title of the alert.
     * @param message The message to show.
     */
    createAlert(title: string, message: string) {
        let dlgKey = "alert" + this.state.dialogs.length;

        return new Promise((resolve) => {
            this.showDialog(<Dialog title={title} content={message} key={dlgKey} buttons={[
                <DialogButton key="ok" label="OK" onclick={()=>{
                    resolve(void 0);
                    this.closeDialog(dlgKey);
                }}></DialogButton>
            ]}></Dialog>);
        });
    }

    /**
     * Closes the specified dialog.
     * @param id The ID (key) of the dialog to close.
     */
    closeDialog(id: string) {
        const dlgIdx = this.state.dialogs.findIndex(x => x.key == id);

        if(dlgIdx !== -1)
            this.state.dialogs.splice(dlgIdx, 1);

        // Reload state
        this.setState(this.state);
    }

    render() {
        return <div className='dialog-container'>
            {this.state.dialogs}
        </div>
    }
}

export default DialogManager;