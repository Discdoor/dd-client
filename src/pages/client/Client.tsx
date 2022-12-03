import * as React from 'react';
import { performAPIRequest } from '../../api/APIFetch';
import { getAPIDefinitions } from '../../api/APIProps';
import { APIResponse } from '../../api/APIResponse';
import { APIUserCache } from '../../api/APIUserCache';
import UserEntity from '../../api/entities/UserEntity';
import DialogManager from '../../components/client/dialog/DialogManager';
import GuildBar from '../../components/client/layout/GuildBar';
import HomeContentPane from '../../components/client/layout/sets/home/HomeContentPane';
import HomeUserPane from '../../components/client/layout/sets/home/HomeUserPane';
import UserPaneContainer from '../../components/client/layout/UserPaneContainer';
import SettingsSubView from '../../components/client/subview/SettingsSubView';
import SubView from '../../components/client/subview/SubView';
import "../../style/client/layout/subview-mgr.scss";
const clientCfg = require('../../../config/client-cfg.json');

/**
 * Client properties.
 */
interface ClientProps {
    user: UserEntity;
}

/**
 * Represents the current client state.
 */
export interface ClientState {
    user: UserEntity;
    activeSubview: React.ReactElement<SubView>;
    activeContentPane: React.ReactElement;
    activeLayoutId: "home" | string;
    caches: {
        userCache: APIUserCache
    }
}

class ClientPage extends React.Component<ClientProps, ClientState> {
    /**
     * Dialog management reference.
     */
    private dlgMgrRef = React.createRef<DialogManager>();

    /**
     * User pane ref.
     */
    private userPaneRef = React.createRef<UserPaneContainer>();

    constructor(props: ClientProps) {
        super(props);

        this.state = {
            user: props.user,
            activeSubview: null,
            activeLayoutId: null,
            activeContentPane: null,
            caches: {
                userCache: new APIUserCache()
            }
        };
    }

    getDialogManager = ()=>this.dlgMgrRef;

    /**
     * Heartbeat check - ensures we are still logged in etc.
     */
    async performHeartbeat() {
        const endpoint = getAPIDefinitions().gwServer + "/auth/session/validate";
        const resp = await performAPIRequest<APIResponse<null>>(endpoint, "POST", {});
        
        if((!resp.success) && (resp.code == 401)) {
            // User is not signed in anymore, redir to login page
            window.location.href = "/login";
        }
    }

    /**
     * Sets the active subview.
     * @param subview The subview to make active.
     */
    setActiveSubview(subview: React.ReactElement<SubView>) {
        if(this.state.activeSubview != null)
            return; // Wait until subview is done

        this.setState({ activeSubview: subview });
    }

    /**
     * Closes the active subview.
     */
    closeSubview() {
        this.setState({ activeSubview: null });
    }

    /**
     * Shows the user settings UI.
     */
    showSettingsUI() {
        this.setState({
            activeSubview: <SettingsSubView inst={this}></SettingsSubView>
        });
    }

    /**
     * Sets the active content pane.
     * @param content The content to use.
     */
    setContentPane(content: React.ReactElement) {
        this.setState({ activeContentPane: content });
    }

    /**
     * Sets the active user pane.
     * @param content The content to use.
     */
    setUserPane(content: React.ReactElement) {
        this.userPaneRef.current.setState({ paneContent: content });
    }

    /**
     * Loads a UI layout.
     * @param id The ID of the layout to load.
     */
    loadLayout(id: string) {
        switch(id) {
            case "home":
                this.setUserPane(<HomeUserPane inst={this}></HomeUserPane>);
                this.setContentPane(<HomeContentPane inst={this}></HomeContentPane>);
                this.setState({ activeLayoutId: id });
                break;
        }
    }

    /**
     * Client init function.
     */
    componentDidMount(): void {
        // Check if user has a pending verification
        if(this.state.user.verifStatus == "AWAIT_VERIF")
            // Show dialog asking for email check
            this.dlgMgrRef.current.createAlert("Account Verification Needed", "Please check your email for a confirmation link. You will need to verify your account to continue using DiscDoor.");
    
        // Start heartbeat routine
        setInterval(()=>this.performHeartbeat(), clientCfg.HB_REFRESH_RATE);

        // Start at home page
        this.loadLayout("home");
    }

    /**
     * Renders the client.
     */
    render() {
        /*
        Client layout consists of 3 boxes:
            - Left guild pane
            - prop pane
            - content pane
        */
        return <div className='client'>
            <DialogManager ref={this.dlgMgrRef}></DialogManager>
            <div className="subview-container">
                { this.state.activeSubview ?? '' }
            </div>
            <GuildBar></GuildBar>
            <UserPaneContainer ref={this.userPaneRef} inst={this} user={this.props.user}></UserPaneContainer>
            <div className='content-pane'>
                { this.state.activeContentPane ?? '' }
            </div>
        </div>
    }
}

export default ClientPage;