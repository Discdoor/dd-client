import * as React from 'react';

/**
 * User pane action element.
 */
const UserPaneAction = (props: { icon: string, onclick: React.MouseEventHandler<HTMLDivElement> }) => {
    return <div className='action' style={{ backgroundImage: `url(${props.icon})` }} onClick={props.onclick}>
        
    </div>
}

export default UserPaneAction