import { useContext, useEffect, useState } from "react";
import { getMessages } from "../backend/boardapi";
import { ChannelResource, MessagesResource } from "../ChannelResources"
import LoadingIndicator from "./LoadingIndicator";
import Message from "./Message";
import { UserResource } from "../AdministerUsersService";

export function User(
    props: {
        user: UserResource
    }
) {
    const [user, setUser] = useState<UserResource | null>();
    const [errorMsg, setErrorMsg]  = useState<string | null>();

    const myEntry = props.user;

    async function load() {
        try {
            setUser(user);
            setErrorMsg(null);
        } catch (err) {
            setUser(null);
            setErrorMsg(String(err));
        }
    }
    useEffect(() => { load(); }, []);    
    
        return (
            <div>
                <p>Name: {myEntry.name}</p>
                <p>E-Mail: {myEntry.email}</p>
                <p>Admin: {myEntry.admin +""}</p>
            </div>
        )
    
}
export default User;