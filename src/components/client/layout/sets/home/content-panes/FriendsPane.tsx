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
const FriendUserListItem = (props: { avatarUrl: string, name: string, discrim: string, filter: "friend"|"pending"|"block"|string }) => {
    return <div className='item'>
            <div className='avatar' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + props.avatarUrl})` }}></div>
            <div className='name'>
                <span className='username'>{props.name}</span>
                <span className='discrim'>#{props.discrim}</span>
            </div>
            <div className='buttons'>
                {(()=>{
                    switch(props.filter) {
                        default:
                            return [];
                        case "friend":
                            return [
                                <div key="msg" className='button msg' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/message.svg"})` }}></div>,
                                <div key="pill" className='button pill-menu' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/more.svg"})` }}></div>
                            ];
                        case "pending":
                            return [
                                <div key="remove" className='button remove' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/dlg-close.svg"})` }}></div>
                            ];
                        case "block":
                            return [
                                <div key="remove" className='button remove' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/dlg-close.svg"})` }}></div>
                            ];
                    }
                })()}
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
    filter: "friend"|"block"|"pending"|string;

    /**
     * User cache to get user info from.
     */
    userCache: APIUserCache;
}

/**
 * User list state.
 */
interface UserListState {
    users: CachedUserEntity[];
    filter: string;
}

class UserList extends React.Component<UserListProps, UserListState> {
    constructor(props: UserListProps) {
        super(props);
        
        this.state = {
            users: [],
            filter: this.props.filter
        };
    }

    componentDidMount(): void {}

    render() {
        return <div className='user-list'>
            {(this.state.users.length == 0) ? (()=> {
                if(this.state.filter == "friend")
                    return <div className='bg-text'>You have no friends.</div>
                else if(this.state.filter == "block")
                    return <div className='bg-text'>
                        No users have currently been blocked.<br></br>
                        <br></br>
                        Blocking a user will block all communication from them.
                    </div>
                else if(this.state.filter == "pending")
                    return <div className='bg-text'>
                        No requests are currently pending.
                    </div>
                else
                    return <div className='bg-text'>Nothing found :(</div>
            })()
            : this.state.users.map(x => <FriendUserListItem key={x.id} name={x.username} discrim={x.discrim} avatarUrl={x.avatarUrl} filter={this.state.filter}></FriendUserListItem>)}
        </div>
    }
}

interface FriendsPaneState {
    filter: string;
}

/**
 * Friends pane.
 */
class FriendsPane extends React.Component<FriendsPaneProps, FriendsPaneState> {
    private userListRef = React.createRef<UserList>();

    constructor(props: FriendsPaneProps) {
        super(props);

        this.state = {
            filter: "friend"
        };
    }

    refreshList() {
        performAPIRequest<UserRelationship[]>(getAPIDefinitions().gwServer + "/user/relations/@me/" + this.state.filter, "GET", "").then(async (v) => {
            let usersList: CachedUserEntity[] = [];
            if(v.success) {
                // Show friends
                for(let f of v.data)
                    usersList.push(await this.props.inst.state.caches.userCache.fetch(f.targetId));

            } else {
                // Show some kind of error message here

            }

            this.userListRef.current.setState({ filter: this.state.filter, users: usersList });
        });
    }

    componentDidUpdate(prevProps: Readonly<FriendsPaneProps>, prevState: Readonly<FriendsPaneState>, snapshot?: any): void {
        this.refreshList();
    }

    render() {
        return <div className='home-content friends'>
            <ComboTabControl title="Friends" icon={getAPIDefinitions().cdn + "/assets/client/icons/24x24/friends.svg"} startingPageId='friend' pages={[
                { id: "friend", name: "All" },
                { id: "pending", name: "Requests"},
                { id: "blocked", name: "Blocked"}
            ]} actions={[]} detachedContent={<div>
                <div className={'top ' + this.state.filter}>
                    {(()=>{
                        if(this.state.filter == 'pending') {
                            return <div className="request-box">
                                <div className='title'>Add a friend</div>
                                <div className='desc'>You can add a new friend by entering their tag below.</div>
                                <div className='input-container'>
                                    <input className='ui-textbox' type="text" placeholder='Username#1234'></input>
                                    <button>Send Request</button>
                                </div>
                            </div>
                        } else
                            return '';
                    })()}
                </div>
                <UserList ref={this.userListRef} userCache={this.props.inst.state.caches.userCache} filter={this.state.filter}></UserList>
            </div>}
            ontabchanged={(v: string)=>{
                switch(v) {
                    default:
                        this.setState({ filter: v });
                        break;
                    case "blocked":
                        this.setState({ filter: "block" });
                        break;
                }
            }}></ComboTabControl>
        </div>
    }
}

export default FriendsPane;