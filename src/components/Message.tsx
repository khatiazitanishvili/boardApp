import { MessageResource } from "../ChannelResources"

export function Message(
    props: {
        message: MessageResource
    }
) {
    const myEntry = props.message;
    return (
        <div>
            <h3>{myEntry.title}</h3>
            <p>{myEntry.content} </p>
            <p>From {myEntry.author}, {myEntry.createdAt}</p>
        </div>
    )
}

export default Message;