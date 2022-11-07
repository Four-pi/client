import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IPChangeHistoryWidget from "../components/IPChangeHistoryWidget";
import MachineStatusWidget from "../components/MachineStatusWidget";

export default function IndexPage() {
    return (
        <Container fluid>
            <Row className="mt-3">
                <Col xs={6}>
                    31/32 Hosts, Today ticket total/auth/reject/remind
                </Col>
                <Col xs={6}>
                    <IPChangeHistoryWidget />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={12}>
                    <MachineStatusWidget />
                </Col>
            </Row>
        </Container>
    );
}
