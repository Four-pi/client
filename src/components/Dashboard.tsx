import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MachineStatusWidget, ActiveAddressWidget, RecentlyOpenedAddressWidget, IPChangeHistoryWidget } from "./widgets";

export function Dashboard() {
    return (
        <Container className="mt-3" fluid>
            <Row>
                <Col xs={6}>
                    <ActiveAddressWidget />
                    <IPChangeHistoryWidget />
                </Col>
                <Col xs={6}>
                    <RecentlyOpenedAddressWidget />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <MachineStatusWidget />
                </Col>
            </Row>
        </Container>
    );
}
