import React, { Fragment, useState } from "react";
import { deleteUser, getUsers, isUserAdmin } from "../backend/boardapi";
import LoadingIndicator from "./LoadingIndicator";
import { Container, Row, Col, Button, Dropdown, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useUserIDContext } from "./UserIdContext";
import { useErrorHandler } from "react-error-boundary";
import { UserResource, UsersResource } from "../AdministerUsersService";
import User from "./User";
import UserDialog from "./UserCreateDialog";
import { useNavigate } from "react-router-dom";
import UserCreateDialog from "./UserCreateDialog";
import UserEditDialog from "./UserEditDialog";

export default function PageAdmin() {
    const [myEntries, setMyEntries] = useState<UsersResource | null>();
    const [showDlg, setShowDlg] = React.useState(false);
    const [showDlg2, setShowDlg2] = React.useState(false);
    const [isCreate, setCreateOrEdit] = React.useState(true);
    const { userID } = useUserIDContext();
    const handleError = useErrorHandler();
    const [userResource, setUserResource] = useState<UserResource>({ name: "", email: "", admin: false });
    const navigate = useNavigate();

    function showCreate() { setShowDlg(true); }

    async function showEdit(userResource: UserResource) {
        setUserResource({
            name: userResource.name, email: userResource.email, admin: userResource.admin,
            password: userResource.password, id: userResource.id
        } as UserResource);
        setCreateOrEdit(false);
        setShowDlg2(true);
    }

    function hide() { setShowDlg(false); setShowDlg2(false); }

    async function onDelete(id: string) {
        await deleteUser(id);
    }

    async function load() {
        try {
            if (userID === undefined) {
                navigate("/");
            } else {
                const adminCheck = await isUserAdmin(userID!);
                if (myEntries && adminCheck) {
                    setMyEntries(await getUsers());
                }
                const c = await getUsers();
                setMyEntries(c);
            }
        } catch (err: any) {
            setMyEntries(null);
            handleError(err);
        }
    }

    React.useEffect(() => { load(); }, [myEntries]);
    React.useEffect(() => { hide(); }, []);

    if (!myEntries) {
        return <LoadingIndicator />
    } else {
        return (
            <div>
                <br></br>
                <Container>
                    <Row xs={2} md={4}>
                        <Col>
                            <h3>Alle registrierten User</h3>
                        </Col>
                        <Col>
                            <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => { showCreate(); }}>Create User</Button>
                        </Col>
                    </Row>
                    <br></br>
                    <Row className="g-2">
                        {
                            myEntries.users.map(myEntry =>
                                <><Card key={myEntry.id} style={{ width: '20rem' }}>
                                    <Card.Body>
                                        <User user={myEntry}></User>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="success" style={{ marginRight: '10px' }} onClick={() => { showEdit(myEntry) }}>Edit User</Button>
                                        {myEntry.id !== userID ?
                                            <Button variant="danger" style={{ marginRight: '10px' }} onClick={() => { onDelete(myEntry.id!); }}>Delete User</Button>
                                            : <></>
                                        }
                                    </Card.Footer>
                                </Card></>
                            )
                        }
                    </Row>
                </Container>
                <Fragment>
                    <UserCreateDialog show={showDlg} onHide={hide}></UserCreateDialog>
                </Fragment>
                <Fragment>
                    <UserEditDialog userResource={userResource} setUserResource={setUserResource} show={showDlg2} onHide={hide}></UserEditDialog>
                </Fragment>
            </div>
        )
    }
}