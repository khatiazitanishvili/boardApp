import { Card } from "react-bootstrap";
import { logout } from "../backend/boardapi";

export default function ErrorFallback({ error }:
    { error: Error }) {
    return (
        <div>
            <br></br>
            <h1>Something went wrong: </h1>
            <Card bg={'dark'} text={'light'} style={{ width: '70rem' }}>
                <Card.Body>
                    <Card.Text>
                        <pre>{error.name}</pre>
                        <pre>{error.message}</pre>
                        <pre>{error.stack}</pre>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
