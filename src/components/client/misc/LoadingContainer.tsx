import * as React from 'react';

/**
 * Loading container component.
 */
const LoadingContainer = () => {
    return <div className='container-loading'>
        <div className='spinner'></div>
        <div className='text'>Loading...</div>
    </div>
}

export default LoadingContainer