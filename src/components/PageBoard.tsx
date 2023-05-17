import { BoardResource, ChannelResource } from "../ChannelResources";
import React, { useState, useEffect, createContext } from 'react';
import LoadingIndicator from "./LoadingIndicator";
import ChannelDescription from "./ChannelDescription";
import { getBoard, logout } from "../backend/boardapi";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useErrorHandler } from "react-error-boundary";
import { useUserIDContext } from "./UserIdContext";
import { LinkContainer } from "react-router-bootstrap";

export default function PageBoard() {
    const [myEntries, setMyEntries] = useState<BoardResource | null>();
    const { userID } = useUserIDContext();
    const handleError = useErrorHandler();

    async function load() {
        try {
            const c = await getBoard();
            setMyEntries(c);
        } catch (err: any) {
            setMyEntries(null);
            if (err.name === "TokenExpiredError" || "SyntaxError") {
                logout();
            } else {
                handleError(err);
            }
        }
    }
    React.useEffect(() => { load(); }, [userID]);

    if (!myEntries) {
        return <LoadingIndicator />
    } else {
        return (
            <div>
                <br></br>
                <Container>
                    <Row xs={2} md={4}>
                        <Col>
                            <h3>Channels auf dem Board</h3>
                        </Col>
                        {userID ?
                            <Col key={"channel " + userID}>
                                <Button key={"CreateButton"}>
                                    <LinkContainer to={`/channel/create`}>
                                        <Dropdown.Item id="newChannel">New Channel</Dropdown.Item>
                                    </LinkContainer>
                                </Button>
                            </Col>
                            : <>
                            </>
                        }
                    </Row>
                    <Row className="g-2">
                        {
                            myEntries.channels.map(myEntry =>
                                <><Card key={myEntry.id} style={{ width: '25rem' }}>
                                    <Card.Body>
                                        <><ChannelDescription channel={myEntry} />
                                            <Card.Footer key={myEntry.id}>
                                                <Link to={`/channel/${myEntry.id}`}>View Channel</Link>
                                            </Card.Footer></>
                                    </Card.Body>
                                </Card><br /></>
                            )
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}