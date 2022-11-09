import * as React from 'react';
import LoadingContainer from '../../components/client/misc/LoadingContainer';
import "../../style/client/loading.scss";

/**
 * Initialization page - load user state, friends state, and other stuff here.
 */
const InitPage = () => {
    return <div className='page-init'>
        <LoadingContainer></LoadingContainer>
    </div>
}

export default InitPage