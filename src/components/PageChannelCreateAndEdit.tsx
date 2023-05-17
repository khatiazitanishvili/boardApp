import React from "react";
import { useEffect, useState } from "react";
import { Container, Card, Button, Col, Form } from "react-bootstrap";
import { useErrorHandler } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { createChannel, ErrorFromValidation, getBoard, getChannel, getUserIdFromJWT, updateChannel } from "../backend/boardapi";
import { ChannelResource } from "../ChannelResources"
import { useUserIDContext } from "./UserIdContext";
import { useNavigate } from "react-router-dom";

export default function PageChannelCreateAndEdit() {
    const { userID, setUserID } = useUserIDContext();
    const refName = React.useRef<HTMLInputElement>(null);
    const refDescription = React.useRef<HTMLInputElement>(null);
    const [isPublic, setPublic] = React.useState(false);
    const [channelCount, setChannelCount] = React.useState(0);
    const [validated, setValidated] = React.useState<boolean | undefined>();
    const [nameChange, setChangeName] = React.useState(false);
    const [descriptionChange, setChangeDescription] = React.useState(false);

    const [currentChannel, setChannel] = React.useState<ChannelResource>({} as ChannelResource);

    const user = getUserIdFromJWT();
    setUserID(user);

    const navigate = useNavigate();
    const handleError = useErrorHandler();

    const params = useParams();
    let channelId = params.channelID;

    async function load() {
        try {
            if (channelId) {
                const channel = await getChannel(channelId);
                setChannel(channel);
            }

        } catch (err) {
            handleError(err);
        }
    }

    function update(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setChannel({ ...currentChannel, [e.target.name]: e.target.value });
    }

    async function submitHandler(e: React.FormEvent) {
        try {
            e.preventDefault();
            setValidated(true);
            const form = e.currentTarget as HTMLFormElement;
            if (form.checkValidity() === false) {
                e.stopPropagation(); return;
            }
            const board = await getBoard();
            if (channelId !== undefined) {
                currentChannel.id = channelId;
                setChannel({ ...currentChannel, id: channelId });
                setChannel({ ...currentChannel, public: isPublic });
                await updateChannel(currentChannel);
                board.channels.push(currentChannel);
            } else {
                const channel = {
                    name: refName.current!.value,
                    description: refDescription.current!.value,
                    ownerId: userID,
                    public: isPublic,
                    closed: false
                } as ChannelResource;
                await createChannel(channel);
                board.channels.push(channel);
            }
            setChannelCount(channelCount + 1);
            navigate(-1)
        } catch (err) {
            if (err instanceof ErrorFromValidation) {
                err.validationErrors.forEach((validationError) => {
                    switch (validationError.param) {
                        case "name": refName.current?.setCustomValidity(validationError.msg); break;
                        case "description": refDescription.current?.setCustomValidity(validationError.msg); break;
                    }
                });
            }
        }
    }

    useEffect(() => { load(); }, [channelCount]);

    return (
        <div>
            <Container>
                <Card.Body>
                    <Form onSubmit={submitHandler} validated={validated}>
                        {channelId ?
                            <><Form.Group controlId='formName' className="col col-sm-6">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' name='name' placeholder='Fun Example Name' onChange={update} minLength={5} maxLength={100} required />

                                <Form.Control.Feedback type="invalid">{refName.current?.validationMessage}</Form.Control.Feedback>
                            </Form.Group>
                                <Form.Group controlId='formDescription' className="col col-sm-6">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type='text' name='description' placeholder='Descripe your Channel' onChange={update} minLength={5} maxLength={100} required />

                                    <Form.Control.Feedback type="invalid">{refDescription.current?.validationMessage}</Form.Control.Feedback>
                                </Form.Group><Form.Group controlId='formPublic'>
                                    <Form.Check type='checkbox' label='Public' onChange={e => setPublic(e.target.checked)} />
                                </Form.Group><br></br>
                                <Button type="submit" variant="primary">Submit</Button>
                                <Button variant="danger" onClick={() => navigate(-1)}>Cancel</Button></>
                            :
                            <><Form.Group controlId='formName' className="col col-sm-6">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' name='name' placeholder='Fun Example Name' ref={refName} minLength={5} maxLength={100} required />
                                <Form.Control.Feedback type="invalid">{refName.current?.validationMessage}</Form.Control.Feedback>
                            </Form.Group>
                                <Form.Group controlId='formDescription' className="col col-sm-6">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type='text' name='description' placeholder='Descripe your Channel' ref={refDescription} minLength={5} maxLength={100} required />
                                    <Form.Control.Feedback type="invalid">{refDescription.current?.validationMessage}</Form.Control.Feedback>
                                </Form.Group><Form.Group controlId='formPublic'>
                                    <Form.Check type='checkbox' label='Public' onChange={e => setPublic(e.target.checked)} />
                                </Form.Group><br></br><Button type="submit" variant="primary">Submit</Button>
                                <Button variant="danger" onClick={() => navigate("/")}>Cancel</Button></>
                        }

                    </Form>
                </Card.Body>
            </Container>
        </div>
    )
}