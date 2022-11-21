import * as React from 'react';

/**
 * User pane action element.
 */
const UserBoxField = (props: { name: string, value: string }) => {
    return <div className='field'>
        <div className='label'>{props.name}</div>
        <div className='value'>{props.value}</div>
    </div>
}

export default UserBoxField