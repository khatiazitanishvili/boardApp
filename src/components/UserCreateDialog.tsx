import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { useUserIDContext } from './UserIdContext';
import { deleteMessage, deleteChannel, createUser, updateUser, getUser } from '../backend/boardapi';
import { useNavigate, useParams } from 'react-router-dom';
import { UserResource } from '../AdministerUsersService';
import { isUserAdmin } from '../backend/boardapi';

type UserCreateDialogProps = {
    show: boolean
    onHide: () => void
}

export default function UserCreateDialog({ show, onHide }: UserCreateDialogProps) {
    const handleError = useErrorHandler();
    const { userID, setUserID } = useUserIDContext();

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [admin, setAdmin] = React.useState(false);
    const [userCount, setCount] = React.useState(0);
    const [validated, setValidated] = React.useState<boolean | undefined>();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setValidated(true);
        const user = {
            name: name,
            email: email,
            password: password,
            admin: admin,
        } as UserResource;
        await createUser(user);
        setCount(userCount + 1);
        onHide();
    }

    function onCancel() {
        onHide();
    }

    async function load() {
        try {

        } catch (err) {
            handleError(err);
        }
    }

    React.useEffect(() => { load(); }, [userCount]);

    return (<Modal backdrop="static" show={show} centered onHide={onHide}>
        <form>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Modal.Header closeButton></Modal.Header>
                <><Modal.Title>Create</Modal.Title><Modal.Body>
                    <Form>
                        <Form.Group controlId='formName' className="col col-sm-6">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' name='name' placeholder='User Name' onChange={e => setName(e.target.value)} minLength={5} maxLength={100} required />
                        </Form.Group>
                        <Form.Group controlId='formEmail' className="col col-sm-6">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control type='text' name='email' placeholder='Write E-Mail' onChange={e => setEmail(e.target.value)} minLength={5} maxLength={100} required />
                        </Form.Group>
                        <Form.Group controlId='formPassword' className="col col-sm-6">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Enter password' onChange={e => setPassword(e.target.value)} minLength={5} maxLength={100} required />
                        </Form.Group>
                        <Form.Group controlId='formAdmin'>
                            <Form.Check type='checkbox' label='Admin' onChange={e => setAdmin(e.target.checked)} />
                        </Form.Group>
                        <br></br>
                    </Form>
                </Modal.Body>
                    <Modal.Footer>
                        <><Button variant="secondary" onClick={onSubmit}>Create</Button>
                            <Button variant="primary" onClick={onCancel}>Cancel</Button></>
                    </Modal.Footer></>
            </ErrorBoundary>
        </form>
    </Modal>);
}
