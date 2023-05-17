import Cookies from 'js-cookie';
import React, { Fragment } from 'react';
import { Container, Row, Col, Button, Form, Navbar, Nav, Dropdown, DropdownButton, Modal, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { isUserAdmin, logout } from '../backend/boardapi';
import LoginDialog from './LoginDialog';
import { UserIDContext, useUserIDContext } from './UserIdContext';
import { useErrorHandler } from 'react-error-boundary';

export default function Menu() {
  const [showDlg, setShowDlg] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);
  const { userID, setUserID} = useUserIDContext();
  const handleError = useErrorHandler();

  function show() { setShowDlg(true); }
  function hide() { setShowDlg(false); }

  async function load() {
    try {
      if(userID !== undefined){
        let check = await isUserAdmin(userID);
        setAdmin(check);
      }
    } catch (err: any) {
        handleError(err);
    }
}
  React.useEffect(() => { load(); }, [userID]);

  return <div>
    <Navbar bg="dark" variant="dark">
      <Container className="md-3">
        <Navbar.Brand>Menü</Navbar.Brand>
        <Nav>
            <Row>
              <Col>
              {admin ?
              <>
              <Nav className="justify-content-end" activeKey="/menu">
                <Nav.Item>
                  <Nav.Link href="/admin">Admin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/' eventKey="link-1">Board</Nav.Link>
                </Nav.Item>
                </Nav></>
                :
                <></>
              }
              </Col>
              <Col className="md">
              <NavDropdown title={userID ? "User" : "Guest"} id="navbarScrollingDropdown">
              {userID ?
                <NavDropdown.Item onClick={() => {logout(); setUserID(undefined);}}>logout</NavDropdown.Item>
                :
                <NavDropdown.Item onClick={() => {show();}}>login</NavDropdown.Item>
              }
              </NavDropdown>
              </Col>
            </Row>
        </Nav>
      </Container>
    </Navbar>
    <Fragment>
      <LoginDialog show={showDlg} onHide={hide}></LoginDialog>
    </Fragment>
  </div>
}