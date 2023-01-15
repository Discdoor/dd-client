import * as React from "react";
import { performAPIRequest } from "../../../../../../api/APIFetch";
import { getAPIDefinitions } from "../../../../../../api/APIProps";
import { APIResponse } from "../../../../../../api/APIResponse";
import ComboTabControl from "../../../../../basic/ComboTabControl";
import "../../../../../../style/client/layout/messaging/view.scss";
import UserEntity from "../../../../../../api/entities/UserEntity";
import { APIUserCache } from "../../../../../../api/APIUserCache";
import { ClientInstance } from "../../../../../../pages/client/Client";
import { DMUserInfo } from "./DMUserInfo";
import { MessageItem } from "./MessageItem";
import { ClientContext } from "../../../../../../client/ClientContext";

interface MessagingPaneProps {
    /**
     * Pane init args.
     */
    initialArgs: string[];

    /**
     * The target channel ID.
     */
    channelId: string;

    /**
     * Channel type.
     */
    channelType: "dm"|"guild"|"gdm"
}

interface MessagingPaneState {
    /**
     * Whether the pane is still loading.
     */
    loading: boolean;

    /**
     * Loaded messages.
     */
    messages: unknown[];

    /**
     * Current messages page.
     */
    currentPage: number;

    /**
     * Associated channel.
     */
    channel: unknown;

    /**
     * Recipients.
     */
    recipients: UserEntity[];

    /**
     * Whether a message is being submitted.
     */
    submitting: boolean;
}

export class MessagingPane extends React.Component<MessagingPaneProps, MessagingPaneState> {
    private msgBoxRef = React.createRef<HTMLInputElement>();
    private msgViewRef = React.createRef<HTMLDivElement>();
    private endElRef = React.createRef<HTMLDivElement>();

    constructor(props: MessagingPaneProps) {
        super(props);

        this.state = {
            loading: true,
            channel: null,
            recipients: [],
            messages: [],
            currentPage: 0,
            submitting: false
        }

        this.onMsgBoxKeyDown = this.onMsgBoxKeyDown.bind(this);
    }

    /**
     * Loads messages.
     */
    async loadMessages(page?: number) {
        let messagesResp: APIResponse<unknown>;

        switch(this.props.channelType) {
            case "dm":
                messagesResp = await performAPIRequest(getAPIDefinitions().gwServer + "/messages/" + this.props.channelId + "/" + this.state.currentPage, "GET", {});
                break;
        }

        if(!messagesResp.success) {
            console.error(`Failed to load messages: ${messagesResp.message}`);
            return;
        }

        const messages = [...(messagesResp.data as unknown[])];
        
        for(let x = 0; x < messages.length; x++)
            (messages[x] as any).author = await APIUserCache.fetch((messages[x] as any).authorId);

        // Set state
        this.setState({
            ...this.state,
            ...{
                loading: false,
                messages: [...this.state.messages, ...messages],
                currentPage: this.state.currentPage + ((page != null) ? page : 0)
            }
        });
    }

    /**
     * Prepares the messaging environment.
     */
    async prepare() {
        switch(this.props.channelType) {
            case "dm": {
                const dmResp = await performAPIRequest<{ id: string, recipients: string[] }>(getAPIDefinitions().gwServer + `/channels/dm/${this.props.initialArgs[1]}`, "POST", {});

                if(dmResp.success) {
                    const recipients = dmResp.data.recipients;
                    const fetchedRecipients: UserEntity[] = [];

                    for(let r of recipients) {
                        // Fetch user
                        fetchedRecipients.push((await APIUserCache.fetch(r)) as unknown as UserEntity);
                    }
                    
                    // Get recipients
                    this.setState({
                        ...this.state,
                        ...{
                            recipients: fetchedRecipients
                        }
                    })
                }
                break;
            }
        }
    }

    async componentDidMount() {
        ClientContext.uiStates.messagingPane = this;
        // Get needed state for users
        await this.prepare();
        await this.loadMessages();
    }

    componentWillUnmount(): void {
        ClientContext.uiStates.messagingPane = null;
    }

    /**
     * On key down.
     */
    onMsgBoxKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key == "Enter") {
            const content = (e.target as HTMLInputElement).value;
            this.submitMessage(content);
        }
    }

    /**
     * Pushes a new message object.
     * @param m The message to push.
     */
    async pushMessage(m: any, switchSubmitState: boolean = false) {
        const msg = {
            ...m,
            ...{
                author: await APIUserCache.fetch(m.authorId)
            }
        };

        this.setState({
            ...this.state,
            ...{
                submitting: false,
                messages: [...[msg], ...this.state.messages]
            }
        });
    }

    /**
     * Sends the message.
     * @param message
     */
    async submitMessage(message: string) {
        this.setState({
            ...this.state,
            ...{
                submitting: true
            }
        });

        // Send message to backend
        const msgSendRequest = await performAPIRequest<{ id: string, recipients: string[] }>(getAPIDefinitions().gwServer + `/messages/${this.props.channelId}`, "POST", {
            content: message,
            attachments: []
        });

        if(msgSendRequest.success) {
            await this.pushMessage(msgSendRequest.data, true);
            this.msgBoxRef.current.value = "";
            this.msgBoxRef.current.focus();
        } else {
            // Show red thingy or something
            console.error(`Could not send message: ${msgSendRequest.message}`);
            return;
        }
    }

    componentDidUpdate(prevProps: Readonly<MessagingPaneProps>, prevState: Readonly<MessagingPaneState>, snapshot?: any): void {
        if(this.endElRef.current)
            this.endElRef.current.scrollIntoView();
    }

    render() {
        return this.state.loading ? <div className="home-content loading">
            <div className="spinner"></div>
        </div> :  <div className="home-content messaging">
            {
                (()=>{
                    switch(this.props.channelType) {
                        case "dm":
                            // Get target recipient
                            let targetRecp = "<unknown>";

                            this.state.recipients.forEach((v) => {
                                if(v.id !== ClientInstance.state.user.id)
                                    targetRecp = v.username;
                            });

                            return <ComboTabControl title={targetRecp} icon={getAPIDefinitions().cdn + "/assets/client/icons/24x24/dm.svg"} pages={[
                            ]} actions={[]}></ComboTabControl>
                    }

                    return '';
                })()
            }
            <div className="messages-list" ref={this.msgViewRef}>
            {
                (()=> {
                    const messageObjects: React.ReactElement[] = [];

                    for(let msg of this.state.messages.reverse()) {
                        const m = msg as any;
                        messageObjects.push(<MessageItem key={m.id} date={m.dateSent} content={m.content} author={m.author}></MessageItem>);
                    }

                    return [
                        <DMUserInfo key="dmui" user={this.state.recipients.find(x => x.id == this.props.initialArgs[1])}></DMUserInfo>,
                        ...messageObjects,
                        <div className="end" key="end" ref={this.endElRef}></div>
                    ];
                })()
            }
            </div>
            <div className="input-footer">
                <div className="text-box">
                    <input tabIndex={-1} ref={this.msgBoxRef} className="input" onKeyDown={this.onMsgBoxKeyDown} placeholder={"Message @" + (() => {
                        let targetRecp = "<unknown>";

                        this.state.recipients.forEach((v) => {
                            if(v.id !== ClientInstance.state.user.id)
                                targetRecp = v.username;
                        });

                        return targetRecp;
                    })()} disabled={this.state.submitting}></input>
                </div>
            </div>
        </div>
    }
}