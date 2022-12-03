import * as React from 'react';
import { performAPIRequest } from '../../../../../../api/APIFetch';
import { getAPIDefinitions } from '../../../../../../api/APIProps';
import { APIUserCache } from '../../../../../../api/APIUserCache';
import CachedUserEntity from '../../../../../../api/entities/CachedUserEntity';
import { UserRelationship } from '../../../../../../api/entities/UserRelationEntity';
import ClientPage from '../../../../../../pages/client/Client';
import ComboTabControl from '../../../../../basic/ComboTabControl';
import '../../../../../../style/client/layout/home/pane/friends.scss';

/**
 * Friends page instance props.
 */
interface FriendsPaneProps {
    /**
     * Client page instance.
     */
    inst: ClientPage;
}

/**
 * Represents a friend list item.
 */
const UserListItem = (props: { avatarUrl: string, name: string, discrim: string }) => {
    return <div className='item'>
            <div className='avatar' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + props.avatarUrl})` }}></div>
            <div className='name'>
                <span className='username'>{props.name}</span>
                <span className='discrim'>#{props.discrim}</span>
            </div>
            <div className='buttons'>
                <div className='button msg' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/message.svg"})` }}></div>
                <div className='button pill-menu' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/more.svg"})` }}></div>
            </div>
        </div>;
}

/**
 * User list init props.
 */
interface UserListProps {
    /**
     * Relations filter.
     */
    filter: "all"|"block"|"outgoing";

    /**
     * User cache to get user info from.
     */
    userCache: APIUserCache;
}

/**
 * User list state.
 */
interface UserListState {
    users: CachedUserEntity[]
}

class UserList extends React.Component<UserListProps, UserListState> {
    constructor(props: UserListProps) {
        super(props);
        
        this.state = {
            users: []
        };
    }

    componentDidMount(): void {
        // Get all friends
        performAPIRequest<UserRelationship[]>(getAPIDefinitions().gwServer + "/user/relations/@me/" + this.props.filter, "GET", "").then(async (v) => {
            let usersList: CachedUserEntity[] = [];
            if(v.success) {
                // Show friends
                for(let f of v.data)
                    usersList.push(await this.props.userCache.fetch(f.targetId));

                this.setState({
                    users: usersList
                });
            } else {
                // Show some kind of error message here

            }
        });
    }

    render() {
        return <div className='user-list'>
            {this.state.users.map(x => <UserListItem key={x.id} name={x.username} discrim={x.discrim} avatarUrl={x.avatarUrl}></UserListItem>)}
        </div>
    }
}

/**
 * Friends pane.
 */
class FriendsPane extends React.Component<FriendsPaneProps> {
    constructor(props: FriendsPaneProps) {
        super(props);
    }

    render() {
        return <div className='home-content friends'>
            <ComboTabControl title="Friends" icon={getAPIDefinitions().cdn + "/assets/client/icons/24x24/friends.svg"} startingPageId='all' pages={[
                /* { id: "online", name: "Online", content: <div>TODO: Not implemented - presence is not yet a thing.</div> }, */
                { id: "all", name: "All", content: <UserList userCache={this.props.inst.state.caches.userCache} filter="all"></UserList> },
                { id: "pending", name: "Pending", content: <UserList userCache={this.props.inst.state.caches.userCache} filter="outgoing"></UserList> },
                { id: "blocked", name: "Blocked", content: <UserList userCache={this.props.inst.state.caches.userCache} filter="block"></UserList> },
            ]} actions={[]}></ComboTabControl>
        </div>
    }
}

export default FriendsPane;