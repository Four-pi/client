import { Col, Container, Row, Stack } from "react-bootstrap";
import { ActivePortStatistic } from "../widgets/port-active-statistic";
import { MachineMonitoring } from "../widgets/machine-monitoring";
import { PortRequestList } from "../widgets/port-request-list";
import { PortList } from "../widgets/port-list";
import { DemoSwitch } from "../widgets/demo-switch";

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
                    <Stack gap={3}>
                        <DemoSwitch />
                        <PortRequestList />
                    </Stack>
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
