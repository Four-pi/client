import { useEffect, useState } from "react";
import { Card, ListGroup, Stack } from "react-bootstrap";
import { PortStatusBadge } from "../components/port-status-badge";
import { sitemap } from "../router";
import {
    getSimplifiedAddressList,
    SimplifiedAddress,
} from "../models/simplified-port";
import { Address } from "./address";
import { userApi } from "../apis";

export function PortList() {
    const [addressList, setAddressList] = useState<SimplifiedAddress[]>([]);

    function update() {
        getSimplifiedAddressList().then(setAddressList);
    }

    useEffect(update, []);

    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal">
                    <div>포트 목록</div>
                    {userApi.isLoggedIn() ? (
                        <div className="ms-auto">
                            <a href={sitemap.port.settings.path}>설정</a>
                        </div>
                    ) : null}
                </Stack>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    {addressList.map((address, index) => (
                        <ListGroup.Item key={index}>
                            <Stack direction="horizontal">
                                <div>
                                    <Address
                                        ip={address.ip}
                                        port={address.port}
                                    />
                                </div>
                                <div className="ms-auto">
                                    <PortStatusBadge
                                        isOnline={address.isOnline}
                                        isAuthenticated={
                                            address.isAuthenticated
                                        }
                                    />
                                </div>
                            </Stack>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
            <Card.Footer>서버에 알려진 모든 포트 목록입니다</Card.Footer>
        </Card>
    );
}
