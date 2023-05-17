import { Card } from "react-bootstrap";

export default function LoadingIndicator() {
  return <div>
    <br></br>
    <Card bg={'secondary'} text={'light'} style={{ width: '40rem' }}>
      <Card.Body>
        <Card.Title>Loading... </Card.Title>
        <Card.Text>
          If you see this screen, check whether the backend is (still) running.
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
}