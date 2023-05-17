import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { useUserIDContext } from './UserIdContext';
import { updateUser, getUser } from '../backend/boardapi';
import { UserResource } from '../AdministerUsersService';
import { isUserAdmin } from '../backend/boardapi';

type UserEditDialogProps = {
    userResource: UserResource
    setUserResource: (user: UserResource) => void
    show: boolean
    onHide: () => void
}

export default function UserEditDialog({ userResource, setUserResource, show, onHide }: UserEditDialogProps) {
    const [validationErrors, setValidationErrors] = React.useState<UserResource>({ name: "", email: "", password: "", admin: false });
    const handleError = useErrorHandler();
    const { userID, setUserID } = useUserIDContext();

    const [name, setName] = React.useState(userResource.name);
    const [email, setEmail] = React.useState(userResource.email);
    const [password, setPassword] = React.useState(userResource.password);
    const [admin, setAdmin] = React.useState(userResource.admin);
    const [emailChange, setChangeEmail] = React.useState(false);
    const [nameChange, setChangeName] = React.useState(false);
    const [userCount, setCount] = React.useState(0);

    const [isAdmin, setNewAdmin] = React.useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        //newUser.id = userResource.id;
        userResource.admin = admin;
        await updateUser(userResource);
        setCount(userCount + 1);
        onHide();
    }

    function update(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setUserResource({ ...userResource, [e.target.name]: e.target.value })
    }

    function validate(e: React.FocusEvent<HTMLInputElement>) {
        switch (e.target.name) {
            case "name": setValidationErrors({
                ...validationErrors,
                name: (userResource.name.length < 5 || userResource.name.length > 100)
                    ? "Name must be at least 5 characters long and maximum 100 characters long." : ""
            });
                break;
            case "email": setValidationErrors({
                ...validationErrors,
                email: (userResource.email.length < 5 || userResource.email.length > 100)
                    ? "Content must be at least 5 characters long and maximum 100 characters long." : ""
            });
                break;
                case "password": setValidationErrors({
                    ...validationErrors,
                    email: (userResource.password!.length < 5 || userResource.email.length > 100)
                        ? "Password must be at least 5 characters long and maximum 100 characters long." : ""
                });
                    break;
        }
    }

    function onCancel() {
        onHide();
    }

    async function load() {
        try {
            const user = await getUser(userResource.id!);
            setNewAdmin(await isUserAdmin(user.id!));
        } catch (err) {
            handleError(err);
        }
    }

    React.useEffect(() => { load(); }, []);

    return (<Modal backdrop="static" show={show} centered onHide={onHide}>
        <form>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Modal.Header closeButton></Modal.Header>
                <><Modal.Title>Edit</Modal.Title>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId='formName' className="col col-sm-6">
                                <Form.Label>Name</Form.Label>
                                <Form.Control disabled={!nameChange} type='text' name='name' placeholder='User Name' onChange={update} minLength={5} maxLength={100} required />
                                <Form.Check type='checkbox' label='Change Name?' onChange={e => setChangeName(e.target.checked)} />
                            </Form.Group>
                            <Form.Group controlId='formEmail' className="col col-sm-6">
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control disabled={!emailChange} type='text' name='email' placeholder='Write E-Mail' onChange={update} minLength={5} maxLength={100} required />
                                <Form.Check type='checkbox' label='Change E-Mail?' onChange={e => setChangeEmail(e.target.checked)} />
                            </Form.Group>
                            <Form.Group controlId='formPassword' className="col col-sm-6">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' name='password' placeholder='Enter password' onChange={update} onBlur={validate} minLength={5} maxLength={100} required />
                            </Form.Group>
                            {isAdmin ?
                                <Form.Group controlId='formAdmin'>
                                    <Form.Check type='checkbox' name='admin' label='Admin' onChange={e => setAdmin(e.target.checked)} />
                                </Form.Group>
                                : <></>
                            }
                            <br></br>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <><Button variant="secondary" onClick={onSubmit}>Edit</Button>
                            <Button variant="primary" onClick={onCancel}>Cancel</Button></>
                    </Modal.Footer></>
            </ErrorBoundary>
        </form>
    </Modal>);
}
