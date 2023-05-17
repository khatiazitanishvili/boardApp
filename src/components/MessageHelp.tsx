import React from "react";
import { Card, Form } from "react-bootstrap";
import { MessageResource } from "../ChannelResources"

export type MessageRes = {
    newMessage: MessageResource,
    setNewMessage: (f: MessageResource) => void
}

export default function MessageHelp({ newMessage, setNewMessage }: MessageRes) {
    const [validationErrors, setValidationErrors] = React.useState<MessageResource>({ title: "", content: "", authorId: "", channelId: "" });
    const [titleChange, setChangeTitle] = React.useState(false);
    const [contentChange, setChangeContent] = React.useState(false);

    function update(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setNewMessage({ ...newMessage, [e.target.name]: e.target.value })
    }

    function validate(e: React.FocusEvent<HTMLInputElement>) {
        switch (e.target.name) {
            case "title": setValidationErrors({
                ...validationErrors,
                title: (newMessage.title.length < 5 || newMessage.title.length > 100)
                    ? "Title must be at least 5 characters long and maximum 100 characters long." : ""
            });
                break;
            case "content": setValidationErrors({
                ...validationErrors,
                content: (newMessage.content.length < 5 || newMessage.content.length > 1000)
                    ? "Content must be at least 5 characters long and maximum 100 characters long." : ""
            });
                break;
        }
    }

    return (
        <div>
            <Form.Group controlId='formTitel' className="col col-sm-6">
                <Form.Label>Titel</Form.Label>
                <Form.Control type='text' name='title' placeholder='Messagetitel' onChange={update} onBlur={validate} minLength={5} maxLength={100} required />
                <Form.Check type='checkbox' label='Change Title?' onChange={e => setChangeTitle(e.target.checked)} />
            </Form.Group>
            <Form.Group controlId='formContent' className="col col-sm-6">
                <Form.Label>Content</Form.Label>
                <Form.Control type='text' name='content' placeholder='Write your Message...' onChange={update} onBlur={validate} minLength={5} maxLength={100} required />
                <Form.Check type='checkbox' label='Change Content?' onChange={e => setChangeContent(e.target.checked)} />
            </Form.Group>
        </div>
    )
}