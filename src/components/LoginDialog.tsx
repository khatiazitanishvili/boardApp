import { Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Modal } from 'react-bootstrap';
import { login, getUserIdFromJWT, logout } from "../backend/boardapi";
import React from 'react';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { useUserIDContext } from './UserIdContext';

type LoginDialogProps = {
    show: boolean
    onHide: () => void
}

export default function LoginDialog({ show, onHide }: LoginDialogProps) {
    const { userID, setUserID} = useUserIDContext();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleError = useErrorHandler();
    
    async function handleSubmit() {
        const c = await login(email, password);
        const user = getUserIdFromJWT();
        setUserID(user);
        if (c && user !== undefined) {
            onHide();
        }
    }

    function onCancel() {
        logout();
        onHide();
    }

    async function load() {
        try {
            
        } catch (err) {
            handleError(err);
        }
    }

    React.useEffect(() => { load(); }, []);

    return (<Modal backdrop="static" show={show} centered onHide={onHide}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Modal.Header closeButton><Modal.Title>Login</Modal.Title></Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId='formEmail'>
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control type='email' placeholder='Example@email.de' onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='formPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>Login</Button>
                </Modal.Footer>
            </ErrorBoundary>
    </Modal>);
}
