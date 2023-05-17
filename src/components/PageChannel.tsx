import { Fragment, useEffect, useState } from "react";
import { Container, Card, Row, Dropdown, Button, Col } from "react-bootstrap";
import { useErrorHandler } from "react-error-boundary";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getChannel, getMessages } from "../backend/boardapi";
import { ChannelResource, MessageResource, MessagesResource } from "../ChannelResources"
import LoadingIndicator from "./LoadingIndicator";
import Message from "./Message";
import { useUserIDContext } from "./UserIdContext";
import React from "react";
import DeleteDialog from "./DeleteDialog";

interface MessageResourceContextType {
    messageResource: MessageResource | undefined;
    setMessageResource: (messageResouce: MessageResource | undefined) => void
}
export const MessageResourceContext = React.createContext<MessageResourceContextType>({} as MessageResourceContextType)
export const useMessageResourceContext = () => React.useContext(MessageResourceContext);

export default function PageChannel() {
    const [myMessages, setMyMessages] = useState<MessagesResource | null>();
    const [channel, setChannel] = useState<ChannelResource | null>();
    const [showDlg, setShowDlg] = React.useState(false);
    const handleError = useErrorHandler();

    const { userID, setUserID } = useUserIDContext();

    const params = useParams();
    const id = params.channelID;

    function show() { setShowDlg(true); }
    function hide() { setShowDlg(false); }

    async function load() {
        try {
            const messages = await getMessages(id!.toString());
            const channel = await getChannel(id!);
            setMyMessages(messages);
            setChannel(channel);
        } catch (err) {
            setMyMessages(null);
            setChannel(null);
            handleError(err);
        }
    }

    useEffect(() => { load(); }, []);

    if (!myMessages) {
        return <LoadingIndicator />
    } else {
        return (
            <div>
                <br></br>
                <Container>
                    <Row xs={2} md={4}>
                        <Col>
                            <h3>{channel!.name}</h3>
                        </Col>
                        {userID && userID === channel!.ownerId ?
                            <Col>
                                <><Link to={`/channel/${id}/edit`}>
                                    <Button id="editChannel" variant="success" style={{ marginRight: '10px' }} key={"EditChannelButton"}>Edit Channel</Button>
                                </Link>
                                    <Button variant="danger" onClick={() => { show(); }}>Delete Channel</Button> <br></br> </>
                            </Col>
                            : <></>
                        }
                    </Row>
                    <Card bg="secondary" text="light">
                        <h4>Description: {channel!.description}</h4>
                        <small style={{ textAlign: "center" }}>MessageCount: {channel!.messageCount}, Created at: {channel!.createdAt} from {channel!.owner}</small>
                    </Card>
                </Container>
                <Container>
                    <Col>
                        <h5>Messages on the channel:</h5>
                    </Col>
                    {userID ?
                        <Col>
                            <Button key={"CreateMessageButton"} id="newMessage">
                                <LinkContainer to={`/channel/${id}/newMessage`}>
                                    <Dropdown.Item>New Message</Dropdown.Item>
                                </LinkContainer>
                            </Button>
                        </Col>
                        : <></>
                    }
                    <br></br>
                    <Row className="g-2">
                        {
                            myMessages.messages.map(myEntry =>
                                <><Card style={{ width: '25rem' }}>
                                    <Card.Body>
                                        <Message message={myEntry} key={myEntry.id} />
                                        {userID === myEntry.authorId ?
                                            <Link to={`/message/${myEntry.id}/edit`}>
                                                <Button variant="success" key={"EditMessageButton"}>Edit Message</Button>
                                            </Link>
                                            : <></>
                                        }
                                    </Card.Body>
                                    <Card.Footer>
                                        <Link to={`/message/${myEntry.id}`}>View Message</Link>
                                    </Card.Footer>
                                </Card><br /></>
                            )
                        }
                    </Row>
                    <Fragment>
                        <DeleteDialog show={showDlg} onHide={hide}></DeleteDialog>
                    </Fragment>
                </Container>
            </div>
        )
    }
}
