import * as React from 'react';
import UserEntity from '../../api/entities/UserEntity';
import DialogManager from '../../components/client/dialog/DialogManager';
import GuildBar from '../../components/client/layout/GuildBar';
import UserPaneContainer from '../../components/client/layout/UserPaneContainer';

/**
 * Client properties.
 */
interface ClientProps {
    user: UserEntity;
}

class ClientPage extends React.Component<ClientProps> {
    constructor(props: ClientProps) {
        super(props);
    }

    render() {
        /*
        Client layout consists of 3 boxes:
            - Left guild pane
            - prop pane
            - content pane
        */
        return <div className='client'>
            <DialogManager></DialogManager>
            <GuildBar></GuildBar>
            <UserPaneContainer user={this.props.user}></UserPaneContainer>
        </div>
    }
}

export default ClientPage;