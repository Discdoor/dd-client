import * as React from 'react';

/**
 * User pane action element.
 */
const HomeUserPaneItem = (props: { label: string, icon: string, onclick: React.MouseEventHandler<HTMLDivElement> }) => {
    return <div className='item' onClick={props.onclick}>
        <div className='icon' style={{ backgroundImage: `url(${props.icon})` }}></div>
        <div className='label'>{props.label}</div>
    </div>
}

export default HomeUserPaneItem