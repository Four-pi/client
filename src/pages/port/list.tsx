import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import type { Port } from "../../models/base";
import * as apis from "../../apis";
import { PortStatusBadge } from "../../components/port-status-badge";

// TODO: request api를 이용하여 getActivePort 만으로 알잘딱하기.

export function PortListPage() {
    return (
        <Container>
            <Row className="my-3">
                <Col>
                    <h2>포트 관리/포트 목록 보기</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Card>
                        <Card.Header>포트 목록</Card.Header>
                        <Card.Body>
                            <PortList />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

function PortList() {
    const [portsOnline, setPortsOnline] = useState<Port[]>([]);
    const [portsOffline, setPortsOffline] = useState<Port[]>([]);

    async function updatePorts() {
        const portsOnline = (await apis.portApi.getActivePorts()).slice();
        const portsOffline = (await apis.portApi.listPorts()).filter(
            (port) => !includesPort(portsOnline, port)
        );
        setPortsOnline(portsOnline);
        setPortsOffline(portsOffline);
    }

    useEffect(() => {
        updatePorts();
    }, []);

    return (
        <ListGroup>
            {portsOnline.map((port, index) => (
                <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-start"
                >
                    <div>
                        {port.ip}
                        <span style={{ color: "gray" }}>:{port.port}</span>
                    </div>
                    <PortStatusBadge isOnline isAuthenticated={port.is_open} />
                </ListGroup.Item>
            ))}
            {portsOffline.map((port, index) => (
                <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-start"
                >
                    <div>
                        {port.ip}
                        <span style={{ color: "gray" }}>:{port.port}</span>
                    </div>
                    <PortStatusBadge isAuthenticated={port.is_open} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

function includesPort(portList: Port[], port: Port): boolean {
    return (
        portList.find((p) => p.ip === port.ip && p.port === port.port) !==
        undefined
    );
}
