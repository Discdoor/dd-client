import * as React from 'react';
import UserEntity from '../../api/entities/UserEntity';

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
        return <div className='client'>
            Client
        </div>
    }
}

export default ClientPage;