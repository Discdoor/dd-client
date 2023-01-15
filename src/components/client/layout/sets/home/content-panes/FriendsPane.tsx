import * as React from 'react';
import { performAPIRequest } from '../../../../../../api/APIFetch';
import { getAPIDefinitions } from '../../../../../../api/APIProps';
import { APIUserCache } from '../../../../../../api/APIUserCache';
import CachedUserEntity from '../../../../../../api/entities/CachedUserEntity';
import { RelationshipTypeEnum, UserRelationship } from '../../../../../../api/entities/UserRelationEntity';
import ClientPage, { ClientInstance } from '../../../../../../pages/client/Client';
import ComboTabControl from '../../../../../basic/ComboTabControl';
import '../../../../../../style/client/layout/home/pane/friends.scss';
import { CommonRegExp } from '../../../../../../util/Regex';
import { ClientContext, UIState } from '../../../../../../client/ClientContext';
import { ContextMenuCreator } from '../../../../../basic/ContextMenu';

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
 * Accepts a friend request.
 * @param userId The user to accept the request from.
 */
async function acceptFrq(userId: string) {
    const frqResp = await performAPIRequest(getAPIDefinitions().gwServer + `/user/relations/accept`, "POST", {
        target: userId
    });

    if(frqResp.success) 
        UIState.updateFriendUIElements();
}

/**
 * Ignores a friend request.
 * @param userId The user to ignore the request from.
 */
async function denyFrq(userId: string) {
    const frqResp = await performAPIRequest(getAPIDefinitions().gwServer + `/user/relations/deny`, "POST", {
        target: userId
    });

    if(frqResp.success) 
        UIState.updateFriendUIElements();
}

/**
 * Removes outgoing friend request.
 * @param userId The user to ignore the request from.
 */
async function removeFrq(userId: string) {
    const frqResp = await performAPIRequest(getAPIDefinitions().gwServer + `/user/relations/retract`, "POST", {
        target: userId
    });

    if(frqResp.success) 
        UIState.updateFriendUIElements();
}

async function blockUser(userId: string) {
    const blockResp = await performAPIRequest(getAPIDefinitions().gwServer + `/user/relations/block`, "POST", {
        target: userId
    });

    if(blockResp.success) 
        UIState.updateFriendUIElements();
}

async function removeFriend(userId: string) {
    const blockResp = await performAPIRequest(getAPIDefinitions().gwServer + `/user/relations/remove`, "POST", {
        target: userId
    });

    if(blockResp.success) 
        UIState.updateFriendUIElements();
}

async function beginDm(userId: string) {
    const dmResp = await performAPIRequest<{ id: string }>(getAPIDefinitions().gwServer + `/channels/dm/${userId}`, "POST", {});

    if(dmResp.success) 
        ClientInstance.loadLayout("dm", [dmResp.data.id, userId])
    else
        console.error(`Cannot start DM with user ${userId}: ${dmResp.message}`);
}

/**
 * Shows the manage friend menu.
 * @param friendId The ID of the friend to show a menu for.
 */
function showManageFriendMenu(e: React.MouseEvent, friendId: string) {
    ContextMenuCreator.createMenu([
        {
            id: "block",
            label: "Block",
            onclick: ()=>{
                blockUser(friendId);
            }
        },
        {
            id: "remove-friend",
            label: "Remove Friend",
            onclick: ()=>{
                removeFriend(friendId);
            }
        }
    ], e.pageX - 150, e.pageY);
}

/**
 * Represents a friend list item.
 */
const FriendUserListItem = (props: { avatarUrl: string, name: string, discrim: string, filter: "friend"|"pending"|"block"|string, relType: RelationshipTypeEnum, targetUserId: string }) => {
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
                                <div key="msg" onClick={()=>beginDm(props.targetUserId)} className='button msg' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/message.svg"})` }}></div>,
                                <div key="pill" className='button pill-menu' onClick={(e)=>showManageFriendMenu(e, props.targetUserId)} style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/more.svg"})` }}></div>
                            ];
                        case "pending":
                            if(props.relType == RelationshipTypeEnum.incoming) {
                                return [
                                    <div key="accept" onClick={()=>acceptFrq(props.targetUserId)} className='button remove' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/check.svg"})` }}></div>,
                                    <div key="remove" onClick={()=>denyFrq(props.targetUserId)} className='button remove' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/dlg-close.svg"})` }}></div>
                                ];
                            } else if(props.relType == RelationshipTypeEnum.outgoing) {
                                return [
                                    <div key="remove" onClick={()=>removeFrq(props.targetUserId)} className='button remove' style={{ backgroundImage: `url(${getAPIDefinitions().cdn + "/assets/client/icons/24x24/dlg-close.svg"})` }}></div>
                                ];
                            }
                            
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

    /**
     * User relationships.
     */
    relations: UserRelationship[];
}

/**
 * User list state.
 */
interface UserListState {
    users: CachedUserEntity[];
    filter: string;
    relations: UserRelationship[];
}

class UserList extends React.Component<UserListProps, UserListState> {
    constructor(props: UserListProps) {
        super(props);
        
        this.state = {
            users: [],
            filter: this.props.filter,
            relations: []
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
            : this.state.users.map(x => <FriendUserListItem targetUserId={x.id} relType={this.state.relations.find(y => y.targetId == x.id).type} key={x.id} name={x.username} discrim={x.discrim} avatarUrl={x.avatarUrl} filter={this.state.filter}></FriendUserListItem>)}
        </div>
    }
}

interface FriendsPaneState {
    filter: string;
    frqProcessing: boolean;
}

/**
 * Friends pane.
 */
class FriendsPane extends React.Component<FriendsPaneProps, FriendsPaneState> {
    private userListRef = React.createRef<UserList>();
    private requestBoxRef = React.createRef<HTMLInputElement>();

    constructor(props: FriendsPaneProps) {
        super(props);

        this.state = {
            filter: "friend",
            frqProcessing: false
        };

        this.sendFriendRequest = this.sendFriendRequest.bind(this);
    }

    refreshList() {
        performAPIRequest<UserRelationship[]>(getAPIDefinitions().gwServer + "/user/relations/@me/" + this.state.filter, "GET", "").then(async (v) => {
            let usersList: CachedUserEntity[] = [];
            if(v.success) {
                // Show friends
                for(let f of v.data)
                    usersList.push(await APIUserCache.fetch(f.targetId));

            } else {
                // Show some kind of error message here

            }

            this.userListRef.current.setState({ filter: this.state.filter, users: usersList, relations: v.data });
        });
    }

    componentDidMount(): void {
        ClientContext.uiStates.friendsPane = this;
        this.refreshList();
    }

    componentWillUnmount(): void {
        ClientContext.uiStates.friendsPane = null; 
    }

    componentDidUpdate(prevProps: Readonly<FriendsPaneProps>, prevState: Readonly<FriendsPaneState>, snapshot?: any): void {
        this.refreshList();
    }

    /**
     * Sends the friend request.
     */
    async sendFriendRequest() {
        // Check if username is valid
        if(!CommonRegExp.username.test(this.requestBoxRef.current.value))
            return this.props.inst.getDialogManager().current.createAlert("Error", "The specified username is not a valid username.\n\nUsers can only be identified with the exact name and discriminant.");

        // Process addition of frq
        this.setState({ ...this.state, ...{ frqProcessing: true } });
        
        // Send frq
        const frqResp = await performAPIRequest(getAPIDefinitions().gwServer + `/user/relations/add`, "POST", {
            tag: this.requestBoxRef.current.value
        });

        if(!frqResp.success)
            this.props.inst.getDialogManager().current.createAlert("Error", "This user cannot be added.");
        else
            this.props.inst.getDialogManager().current.createAlert("Success", "Your friend request has been sent!");        

        this.setState({ ...this.state, ...{ frqProcessing: false } });        
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
                                    <input className='ui-textbox' type="text" placeholder='Username#1234' ref={this.requestBoxRef}></input>
                                    <button onClick={this.sendFriendRequest} disabled={this.state.frqProcessing}>Send Request</button>
                                </div>
                            </div>
                        } else
                            return '';
                    })()}
                </div>
                <UserList ref={this.userListRef} userCache={this.props.inst.state.caches.userCache} filter={this.state.filter} relations={[]}></UserList>
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