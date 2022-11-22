import { Col, Container, Row, Stack } from "react-bootstrap";
import { ActivePortStatistic } from "../components/port-active-statistic";
import { MachineMonitoring } from "../components/machine-monitoring";
import { PortRequestList } from "../components/port-request-list";
import { PortList } from "../components/port-list";

export function MainPage() {
    return (
        <Container className="mt-3" fluid>
            <Row>
                <Col xs={6}>
                    <Stack gap={3}>
                        <ActivePortStatistic />
                        <PortList />
                    </Stack>
                </Col>
                <Col xs={6}>
                    <PortRequestList />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <MachineMonitoring />
                </Col>
            </Row>
        </Container>
    );
}
