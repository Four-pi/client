import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function IndexPage() {
    return (
        <Container fluid>
            <Row className="mt-3">
                <Col xs={6}>
                    31/32 Hosts, Today ticket total/auth/reject/remind
                </Col>
                <Col xs={6}>
                    IP 최근정정일 성공/실패
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={12}>
                    Always top, CPU Disk Memory Network
                </Col>
            </Row>
        </Container>
    );
}
