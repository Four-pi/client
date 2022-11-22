import { useEffect, useState } from "react";
import { Card, Form, ListGroup, Stack } from "react-bootstrap";
import { portApi } from "../apis";
import { Port } from "../models/base";
import { PortStatusBadge } from "./port-status-badge";

export function PortTogglePannel() {
    const [onlinePorts, setOnlinePorts] = useState<Port[]>([]);
    const [offlinePorts, setOfflinePorts] = useState<Port[]>([]);

    async function updatePorts() {
        const activePorts = (await portApi.getActivePorts()).slice();
        const allPorts = (await portApi.listPorts()).slice();

        setOnlinePorts(allPorts.filter((p) => includesPort(activePorts, p)));
        setOfflinePorts(allPorts.filter((p) => !includesPort(activePorts, p)));
    }

    useEffect(() => {
        updatePorts();
    }, []);

    const handleTogglePort = (port: Port) => {
        if (port.is_open) {
            portApi.close(port.ip, port.port).then(updatePorts);
        } else {
            portApi.open(port.ip, port.port).then(updatePorts);
        }
    };

    return (
        <Card>
            <Card.Header>포트 열기/닫기</Card.Header>
            <Card.Body>
                <ListGroup>
                    {onlinePorts.map((port, index) => (
                        <ListGroup.Item key={index}>
                            {renderPort(
                                port,
                                true,
                                port.is_open,
                                handleTogglePort
                            )}
                        </ListGroup.Item>
                    ))}
                    {offlinePorts.map((port, index) => (
                        <ListGroup.Item key={onlinePorts.length + index}>
                            {renderPort(
                                port,
                                false,
                                port.is_open,
                                handleTogglePort
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
function renderPort(
    port: Port,
    isOnline: boolean,
    isAuthenticated?: boolean,
    onTogglePort?: (port: Port) => any
) {
    return (
        <Stack direction="horizontal" gap={3}>
            <div>
                {port.ip}
                <span style={{ color: "gray" }}>:{port.port}</span>
            </div>
            <div className="ms-auto">
                <PortStatusBadge
                    isOnline={isOnline}
                    isAuthenticated={isAuthenticated}
                />
            </div>
            <div>
                <Form.Check
                    type="switch"
                    defaultChecked={port.is_open}
                    onClick={() => onTogglePort?.(port)}
                />
            </div>
        </Stack>
    );
}

function includesPort(portList: Port[], port: Port): boolean {
    return (
        portList.find((p) => p.ip === port.ip && p.port === port.port) !==
        undefined
    );
}
