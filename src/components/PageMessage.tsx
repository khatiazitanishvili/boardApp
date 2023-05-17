import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { MessageResource } from "../ChannelResources"
import { getMessage } from "../backend/boardapi";
import LoadingIndicator from "./LoadingIndicator";
import { Button, ButtonGroup, Card, Container, Dropdown, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useUserIDContext } from "./UserIdContext";
import DeleteDialog from "./DeleteDialog";
import React from "react";

export default function PageMessage() {
    const [myMessage, setMyMessage] = useState<MessageResource | null>();
    const [errorMsg, setErrorMsg] = useState<string | null>();
    const [showDlg, setShowDlg] = React.useState(false);

    const { userID, setUserID } = useUserIDContext();

    const params = useParams();
    const id = params.messageID;

    function show() { setShowDlg(true); }
    function hide() { setShowDlg(false); }

    async function load() {
        try {
            const message = await getMessage(id!.toString());
            setMyMessage(message);
            setErrorMsg(null);
        } catch (err) {
            setMyMessage(null);
            setErrorMsg(String(err));
        }
    }

    useEffect(() => { load(); }, []);

    if (!myMessage) {
        return <LoadingIndicator />
    }
    return (
        <div>
            <br></br>
            <Container>
                <h3>Content of the message:</h3>
                {userID === myMessage.authorId ?
                    <> <Link to={`/message/${myMessage.id}/edit`}>
                            <Button variant="success" style={{ marginRight: '10px' }} key={"EditMessageButton"}>Edit Message</Button>
                        </Link>
                        <Button variant="danger" onClick={() => { show(); }}>Delete Message</Button> <br></br> </>
                    : <></>
                }
                <br></br>
                <Card bg="secondary" text="light">
                    <h4>{myMessage!.title}</h4>
                    <p>{myMessage!.content}</p>
                    <small>From {myMessage!.author}, {myMessage!.createdAt}</small>
                </Card>
                <Fragment>
                    <DeleteDialog show={showDlg} onHide={hide}></DeleteDialog>
                </Fragment>
            </Container>
        </div>
    )
}
