import React from "react";
import { useEffect, useState } from "react";
import { Container, Card, Row, Dropdown, Button, Col, Form } from "react-bootstrap";
import { useErrorHandler } from "react-error-boundary";
import { useLocation, useParams } from "react-router-dom";
import { createMessage, ErrorFromValidation, getBoard, getChannel, getMessage, getMessages, getUserIdFromJWT, updateChannel, updateMessage } from "../backend/boardapi";
import { MessageResource } from "../ChannelResources"
import { useUserIDContext } from "./UserIdContext";
import { useNavigate } from "react-router-dom";
import MessageHelp from "./MessageHelp";


export type MessageRes = {
    newMessage: MessageResource,
    setNewMessage: (f: MessageResource) => void
}

export default function PageChannelEdit() {
    const { userID, setUserID } = useUserIDContext();
    const [newMessage, setNewMessage] = React.useState<MessageResource>({ authorId: "", title: "", content: "", channelId: "" });

    const navigate = useNavigate();
    const handleError = useErrorHandler();

    const params = useParams();
    let messageId = params.messageID;

    const user = getUserIdFromJWT();
    setUserID(user);

    async function load() {
        try {
            if (!messageId) {
                throw new Error("MessageId not found")
            }
            const newMessage = await getMessage(messageId);
            if (!newMessage) {
                throw new Error("Message with this id not found")
            }
            setNewMessage(newMessage);
        } catch (err) {
            handleError(err);
        }
    }

    async function onUpdate() {
        try {
            if (!messageId) {
                throw new Error("ChannelID is null");
            }
            const m = await updateMessage(newMessage);
            navigate(-1);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => { load(); }, []);

    return (
        <div>
            <Container>
                <Card.Body>
                    <MessageHelp newMessage={newMessage} setNewMessage={setNewMessage} />
                    <br />
                    <Button variant="primary" onClick={onUpdate}>Submit</Button>
                    <Button variant="danger" onClick={e => navigate(-1)}>Cancel</Button>
                </Card.Body>
            </Container>
        </div>
    )
}

