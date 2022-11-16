import { useEffect, useState } from "react";
import {
    Card,
    Col,
    Container,
    Form,
    ListGroup,
    Row,
    Stack,
} from "react-bootstrap";
import { includesPort, Port, PortAPI, PortMockAPI } from "../../apis/port";
import { PortStatusBadge } from "../../components/badges";

const portApi: PortAPI = new PortMockAPI();

// TODO: request api를 이용하여 getActivePort 만으로 알잘딱하기.

export function PortSettingsPage() {
    return (
        <Container fluid>
            <Row className="p-3">
                <h2>포트 관리/포트 설정</h2>
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
    const [onlinePorts, setOnlinePorts] = useState<Port[]>([]);
    const [offlinePorts, setOfflinePorts] = useState<Port[]>([]);

    async function updatePorts() {
        const onlinePorts = (await portApi.getActivePorts()).slice();
        const allPorts = (await portApi.listPorts()).slice();
        setOnlinePorts(onlinePorts);
        setOfflinePorts(
            allPorts.filter((port) => !includesPort(onlinePorts, port))
        );
    }

    useEffect(() => {
        updatePorts();
    }, []);

    async function onTogglePort(port: Port) {
        await handleTogglePort(port);
        await updatePorts();
    }

    return (
        <ListGroup>
            {onlinePorts.map((port, index) =>
                renderPort(
                    port,
                    index,
                    port.is_open ? "online-authenticated" : "online-unknown",
                    onTogglePort
                )
            )}
            {offlinePorts.map((port, index) =>
                renderPort(port, index, "offline", onTogglePort)
            )}
        </ListGroup>
    );
}

function renderPort(
    port: Port,
    index: number,
    status: "offline" | "online-authenticated" | "online-unknown",
    onTogglePort?: (port: Port) => any
) {
    return (
        <ListGroup.Item key={index}>
            <Stack direction="horizontal" gap={3}>
                <div>
                    {port.ip}
                    <span style={{ color: "gray" }}>:{port.port}</span>
                </div>
                <div className="ms-auto">
                    <PortStatusBadge status={status} />
                </div>
                <div>
                    <Form.Check
                        type="switch"
                        defaultChecked={port.is_open}
                        onClick={(
                            (p) => () =>
                                onTogglePort?.(p)
                        )(port)}
                    />
                </div>
            </Stack>
        </ListGroup.Item>
    );
}

async function handleTogglePort(port: Port) {
    console.log(port);
    if (port.is_open) {
        await portApi.close(port.ip, port.port);
    } else {
        await portApi.open(port.ip, port.port);
    }
}
