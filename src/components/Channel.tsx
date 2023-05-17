import { useContext, useEffect, useState } from "react";
import { getMessages } from "../backend/boardapi";
import { ChannelResource, MessagesResource } from "../ChannelResources"
import LoadingIndicator from "./LoadingIndicator";
import Message from "./Message";

export function Channel(
    props: {
        channel: ChannelResource
    }
) {
    const [myMessages, setMyMessages] = useState<MessagesResource | null>();
    const [errorMsg, setErrorMsg]     = useState<string | null>();

    const myEntry = props.channel;

    async function load() {
        try {
            const c = await getMessages(myEntry.id!);
            setMyMessages(c);
            setErrorMsg(null);
        } catch (err) {
            setMyMessages(null);
            setErrorMsg(String(err));
        }
    }
    useEffect(() => { load(); }, []);    

    if(!myMessages){
        return <LoadingIndicator />
    } else {
        return (
            <div>
                <h3>{myEntry.name}</h3>
                <p>{myEntry.description}</p>
                <p>MessageCount: {myEntry.messageCount}</p>
                <p>Created at: {myEntry.createdAt} from {myEntry.owner}</p>
                <p>Messages on the channel:</p>
                {
                    myMessages.messages.map(myEntry =>
                    <Message message={myEntry}key={myEntry.id}/>
                    )
                }
            </div>
        )
    }
}

export default Channel;