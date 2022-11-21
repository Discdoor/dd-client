import * as React from 'react';
import GuildEntity from '../../../api/entities/GuildEntity';
import GuildBarItem from './GuildBarItem';

/**
 * Client properties.
 */
interface GuildBarProps {
    guilds?: GuildEntity[]
}

/**
 * Represents the layout for the server bar.
 */
class GuildBar extends React.Component<GuildBarProps> {
    constructor(props: GuildBarProps) {
        super(props);
    }

    /**
     * Fetches user guilds.
     */
    async fetchGuilds() {

    }

    render() {
        return <div className='guild-bar'>
            <GuildBarItem name="Home" icon="" onclick={()=>{}}></GuildBarItem>
        </div>
    }
}

export default GuildBar;