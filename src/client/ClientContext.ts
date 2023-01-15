import FriendsPane from "../components/client/layout/sets/home/content-panes/FriendsPane";
import HomeUserPane from "../components/client/layout/sets/home/HomeUserPane";
import { MessagingPane } from "../components/client/layout/sets/home/messaging/MessagingPane";

/**
 * Represents the current client context.
 */
export const ClientContext = {
    uiStates: {
        friendsPane: null as FriendsPane,
        homeUserPane: null as HomeUserPane,
        messagingPane: null as MessagingPane
    }
}

/**
 * UI state namespace.
 */
export const UIState = {
    updateFriendUIElements
}

/**
 * Updates UI elements related to the "friends" user interface.
 */
function updateFriendUIElements() {
    if(ClientContext.uiStates.friendsPane)
        ClientContext.uiStates.friendsPane.forceUpdate();

    if(ClientContext.uiStates.homeUserPane)
        ClientContext.uiStates.homeUserPane.refreshCounters();
}