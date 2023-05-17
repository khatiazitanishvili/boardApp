import React from "react";
import { useEffect } from "react";
import { Container, Card, Row, Dropdown, Button, Col, Form } from "react-bootstrap";
import { useErrorHandler } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { createMessage, ErrorFromValidation, getBoard, getChannel, getMessage, getMessages, getUserIdFromJWT, updateChannel, updateMessage } from "../backend/boardapi";
import { MessageResource } from "../ChannelResources"
import { useUserIDContext } from "./UserIdContext";
import { useNavigate } from "react-router-dom";

export default function PageChannelCreate() {
    const { userID, setUserID } = useUserIDContext();
    const refTitle = React.useRef<HTMLInputElement>(null);
    const refContent = React.useRef<HTMLInputElement>(null);
    const [messageCount, setNewMessageCount] = React.useState(0);
    const [validated, setValidated] = React.useState<boolean | undefined>();

    const navigate = useNavigate();
    const handleError = useErrorHandler();

    const params = useParams();
    let channelId = params.channelID;

    const user = getUserIdFromJWT();
    setUserID(user);

    async function load() {
        try {
            if (!channelId) {
                throw new Error("ChannelId not found")
            }
        } catch (err) {
            handleError(err);
        }
    }

    async function submitHandler(e: React.FormEvent) {
        try {
            e.preventDefault();
            setValidated(true);
            const form = e.currentTarget as HTMLFormElement;
            if (form.checkValidity() === false) {
                e.stopPropagation(); return;
            }
            const message = {
                title: refTitle.current!.value,
                content: refContent.current!.value,
                authorId: userID,
                channelId: channelId!
            } as MessageResource;
            await createMessage(message);
            setNewMessageCount(messageCount + 1);
            navigate(-1);
        } catch (err) {
            if (err instanceof ErrorFromValidation) {
                err.validationErrors.forEach((validationError) => {
                    switch (validationError.param) {
                        case "title": refTitle.current?.setCustomValidity(validationError.msg); break;
                        case "content": refContent.current?.setCustomValidity(validationError.msg); break;
                    }
                });
            }
        }
    }

    useEffect(() => { load(); }, [messageCount]);

    return (
        <div>
            <Container>
                <Card.Body>
                    <Form onSubmit={submitHandler} validated={validated}>
                        <Form.Group controlId='formTitel' className="col col-sm-6">
                            <Form.Label>Titel</Form.Label>
                            <Form.Control type='text' name='title' placeholder='Messagetitel' ref={refTitle} minLength={5} maxLength={100} required />
                            <Form.Control.Feedback type="invalid">{refTitle.current?.validationMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formContent' className="col col-sm-6">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type='text' name='content' placeholder='Write your Message...' ref={refContent} minLength={5} maxLength={100} required />
                            <Form.Control.Feedback type="invalid">{refContent.current?.validationMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <br></br>
                        <Button type="submit" variant="primary">Submit</Button>
                        <Button variant="danger" onClick={e => navigate(-1)}>Cancel</Button>
                    </Form>
                </Card.Body>
            </Container>
        </div>
    )
}

/*

async function submitHandler(e: React.FormEvent) {
        try {
            e.preventDefault();
            setValidated(true);
            const form = e.currentTarget as HTMLFormElement;
            if (form.checkValidity() === false) {
                e.stopPropagation(); return;
            }
            console.log("Nach Validity");
            const message = {
                title: refTitle.current!.value,
                content: refContent.current!.value,
                authorId: userID,
                channelId: ""
            } as MessageResource;
            console.log("ChannelResource erstellt");
            if (messageId !== undefined) {
                // hier muss noch was für channelid hin
                message.channelId = messageResource!.channelId;
                message.id = messageId;
                const a = await updateMessage(message);
            } else {
                message.channelId = channelId!;
                await createMessage(message);
            }
            setNewMessageCount(messageCount + 1);
            navigate(-1);
        } catch (err) {
            if (err instanceof ErrorFromValidation) {
                err.validationErrors.forEach((validationError) => {
                    switch (validationError.param) {
                        case "title": refTitle.current?.setCustomValidity(validationError.msg); break;
                        case "content": refContent.current?.setCustomValidity(validationError.msg); break;
                    }
                });
            }
        }
    }


return (
        <div>
            <MessageHelp newMessage={newMessage} setNewMessage={setNewMessage} />
            <Container>
                <Card.Body>
                    <Form onSubmit={submitHandler} validated={validated}>
                        <Form.Group controlId='formTitel' className="col col-sm-6">
                            <Form.Label>Titel</Form.Label>
                            <Form.Control type='text' name='title' placeholder='Messagetitel' ref={refTitle} minLength={5} maxLength={100} required />
                            <Form.Control.Feedback type="invalid">{refTitle.current?.validationMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formContent' className="col col-sm-6">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type='text' name='content' placeholder='Write your Message...' ref={refContent} minLength={5} maxLength={100} required />
                            <Form.Control.Feedback type="invalid">{refContent.current?.validationMessage}</Form.Control.Feedback>
                        </Form.Group>
                        <br></br>
                        <Button type="submit" variant="primary" onSubmit={onUpdate}>Submit</Button>
                        <Button variant="danger" onClick={e => navigate(-1)}>Cancel</Button>
                    </Form>
                </Card.Body>
            </Container>
        </div>
    )
*/