import * as React from 'react';
import UserEntity from '../../api/entities/UserEntity';
import Dialog from '../../components/client/dialog/Dialog';
import DialogManager from '../../components/client/dialog/DialogManager';
import GuildBar from '../../components/client/layout/GuildBar';
import UserPaneContainer from '../../components/client/layout/UserPaneContainer';

/**
 * Client properties.
 */
interface ClientProps {
    user: UserEntity;
}

/**
 * Represents the current client state.
 */
interface ClientState {
    user: UserEntity;
}

class ClientPage extends React.Component<ClientProps, ClientState> {
    /**
     * Dialog management reference.
     */
    private dlgMgrRef = React.createRef<DialogManager>();

    constructor(props: ClientProps) {
        super(props);

        this.state = {
            user: props.user
        };

        console.log(this.state.user);
    }

    /**
     * Client init function.
     */
    componentDidMount(): void {
        // Check if user has a pending verification
        if(this.state.user.verifStatus == "AWAIT_VERIF")
            // Show dialog asking for email check
            this.dlgMgrRef.current.createAlert("Account Verification Needed", "Please check your email for a confirmation link. You will need to verify your account to continue using DiscDoor.");
    }

    render() {
        /*
        Client layout consists of 3 boxes:
            - Left guild pane
            - prop pane
            - content pane
        */
        return <div className='client'>
            <DialogManager ref={this.dlgMgrRef}></DialogManager>
            <GuildBar></GuildBar>
            <UserPaneContainer user={this.props.user}></UserPaneContainer>
        </div>
    }
}

export default ClientPage;