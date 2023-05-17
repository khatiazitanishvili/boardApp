import {useContext} from "react";
import { ChannelResource } from "../ChannelResources"

export function ChannelDescription(
    props: {
        channel: ChannelResource,
    }
) {
    const myEntry = props.channel;
    
    return (
        <div>
            <h3>{myEntry.name}</h3>
            <p>{myEntry.description}</p>
            <p>MessageCount: {myEntry.messageCount}</p>
            <p>Created at: {myEntry.createdAt} from {myEntry.owner}</p>
        </div>
    )
}

export default ChannelDescription;