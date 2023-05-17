import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { useUserIDContext } from './UserIdContext';
import { deleteMessage, deleteChannel } from '../backend/boardapi';
import { useNavigate, useParams } from 'react-router-dom';

type DeleteDialogProps = {
    show: boolean
    onHide: () => void
}

export default function DeleteDialog({ show, onHide }: DeleteDialogProps) {
    const handleError = useErrorHandler();
    const params = useParams();
    const navigate = useNavigate();
    const messageId = params.messageID;
    const channelId = params.channelID;

    async function onDelete() {
        if(messageId !== undefined){
            const deleted = await deleteMessage(messageId!);
            console.log("Message gelöscht?: " + deleted);
        } else {
            const deleted = await deleteChannel(channelId!);
            console.log("Channel gelöscht?: " + deleted);
        }
        navigate(-1);
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

    React.useEffect(() => { load(); }, []);

    return (<Modal backdrop="static" show={show} centered onHide={onHide}>
        <form>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Modal.Header closeButton><Modal.Title>Delete</Modal.Title></Modal.Header>

                <Modal.Body>
                        Are you sure?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onDelete}>Delete</Button>
                    <Button variant="primary" onClick={onCancel}>Cancel</Button>
                </Modal.Footer>
            </ErrorBoundary>
        </form>
    </Modal>);
}
