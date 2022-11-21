import * as React from 'react';
import ClientPage from '../../../pages/client/Client';
import "../../../style/client/layout/subview-mgr.scss";

export interface GenericSubviewProps {
    /**
     * Client instance.
     */
    inst: ClientPage;
}

/**
 * Represents a generic subview.
 */
class SubView extends React.Component<GenericSubviewProps> {
    constructor(props: GenericSubviewProps) {
        super(props);
    }

    render() {
        return <div className='subview'></div>
    }
}

export default SubView;