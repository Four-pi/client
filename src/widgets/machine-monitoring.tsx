import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { api } from "../apis";
import type { MachineStatus } from "../models/base";
import { MachineMonitoringPart } from "../components/machine-monitoring-part";

export function MachineMonitoring() {
    const [machineState, setMachineState] = useState<MachineStatus>({});

    function update() {
        api.monitor().then(setMachineState);
    }

    useEffect(update, [machineState]);

    return (
        <Card className="mb-3">
            <Card.Header>장치 부하 상태</Card.Header>
            <Card.Body>
                <Container fluid>
                    <Row>
                        {Object.entries(machineState).map(
                            ([key, value], index) => (
                                <Col key={index}>
                                    <MachineMonitoringPart
                                        label={key}
                                        percentage={value * 100}
                                    />
                                </Col>
                            )
                        )}
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}
