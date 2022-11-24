import { useEffect, useState } from "react";
import { Card, Form, ListGroup, Stack } from "react-bootstrap";
import { api } from "../apis";
import { Address, fetchAddress, listAddress } from "../models/address-status";
import { DisplayAddress } from "../components/address";
import { PortStatusBadge } from "../components/port-status-badge";

export function PortTogglePannel() {
    const [updateSignal, setUpdateSignal] = useState(false);

    function update() {
        setUpdateSignal(!updateSignal);
    }

    useEffect(() => {
        fetchAddress().then(update);
    });

    return (
        <Card>
            <Card.Header>포트 열기/닫기</Card.Header>
            <Card.Body>
                <ListGroup>
                    {listAddress().map((address, index) => (
                        <ListGroup.Item key={index}>
                            <Stack direction="horizontal" gap={3}>
                                <div>
                                    <DisplayAddress
                                        ip={address.ip}
                                        port={address.port}
                                    />
                                </div>
                                <div className="ms-auto">
                                    <PortStatusBadge
                                        isOnline={address.isOnline}
                                        isAuthenticated={address.isAuthorized}
                                    />
                                </div>
                                <div>
                                    <AddressToggelButton address={address} />
                                </div>
                            </Stack>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

function AddressToggelButton({ address }: { address: Address }) {
    const [isAutorized, setIsAutorized] = useState(address.isAuthorized);

    async function update() {
        const port = await api.port.get(address.ip, address.port);
        setIsAutorized(port?.is_open ?? false);
    }

    function onClickHandler() {
        if (isAutorized) {
            api.port.close(address.ip, address.port).then(update);
        } else {
            api.port.open(address.ip, address.port).then(update);
        }
    }

    return (
        <Form.Check
            type="switch"
            defaultChecked={address.isAuthorized}
            onClick={onClickHandler}
        />
    );
}
