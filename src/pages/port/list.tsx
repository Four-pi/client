import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Port, PortAPI, PortMockAPI } from "../../apis/port";
import { PortStatusBadge } from "../../components/badges";

const portApi: PortAPI = new PortMockAPI();

// TODO: request api를 이용하여 getActivePort 만으로 알잘딱하기.

export function PortListPage() {
    return (
        <Container fluid>
            <Row className="p-3">
                <h2>포트 관리/포트 상태 보기</h2>
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
        const portsOnline = (await portApi.getActivePorts()).slice();
        const portsOffline = (await portApi.listPorts()).filter(port => !includesPort(portsOnline, port));
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
                    <PortStatusBadge status={port.is_open ? "online-authenticated" : "online-unknown"} />
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
                    <PortStatusBadge status="offline" />
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

function includesPort(portList: Port[], port: Port): boolean {
    return portList.find(p => p.ip === port.ip && p.port === port.port) !== undefined;
}