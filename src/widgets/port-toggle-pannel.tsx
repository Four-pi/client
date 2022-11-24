import { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup, Stack } from "react-bootstrap";
import { api } from "../apis";
import { Address, fetchAddress } from "../models/core";
import { DisplayAddress } from "../components/address";
import { PortStatusBadge } from "../components/port-status-badge";

export function PortTogglePannel() {
    const [addressList, setAddressList] = useState<Address[]>([]);

    function update(force?: boolean) {
        fetchAddress(force)
            .then((x) => x.slice())
            .then(setAddressList);
    }

    useEffect(update, []);

    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal">
                    <div className="me-auto">포트 열기/닫기</div>
                    <div>
                        <Button onClick={() => update(true)}>새로고침</Button>
                    </div>
                </Stack>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    {addressList.map((address, index) => (
                        <ListGroup.Item key={index}>
                            <AddressRow address={address} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

function AddressRow(props: { address: Address }) {
    const [address, setAddress] = useState(props.address);

    async function onClickHandler() {
        if (address.isAuthorized) {
            await api.port.close(address.ip, address.port);
        } else {
            await api.port.open(address.ip, address.port);
        }
        api.port.get(props.address.ip, props.address.port).then((port) => {
            setAddress({
                ...address,
                isAuthorized: port?.is_open ?? false,
            });
        });
    }

    return (
        <Stack direction="horizontal" gap={3}>
            <div>
                <DisplayAddress ip={address.ip} port={address.port} />
            </div>
            <div className="ms-auto">
                <PortStatusBadge
                    isOnline={address.isOnline}
                    isAuthenticated={address.isAuthorized}
                />
            </div>
            <div>
                <Form.Check
                    type="switch"
                    defaultChecked={address.isAuthorized}
                    onClick={onClickHandler}
                />
            </div>
        </Stack>
    );
}
