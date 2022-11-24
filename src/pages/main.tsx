import { Col, Container, Row, Stack } from "react-bootstrap";
import { ActivePortStatistic } from "../components/port-active-statistic";
import { MachineMonitoring } from "../components/machine-monitoring";
import { PortRequestList } from "../components/port-request-list";
import { PortList } from "../components/port-list";

export function MainPage() {
    return (
        <Container fluid>
            <Row className="my-3">
                <Col xs={6}>
                    <Stack gap={3}>
                        <ActivePortStatistic />
                        <PortList max={10} />
                    </Stack>
                </Col>
                <Col xs={6}>
                    <PortRequestList />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12}>
                    <MachineMonitoring />
                </Col>
            </Row>
        </Container>
    );
}
