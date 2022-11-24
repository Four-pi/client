import { useEffect, useState } from "react";
import { Card, ListGroup, Stack } from "react-bootstrap";
import { PortStatusBadge } from "../components/port-status-badge";
import { sitemap } from "../router";
import { DisplayAddress } from "./address";
import { RequireLogin } from "./require-login";
import { fetchAddress, listAddress } from "../models/address-status";

export function PortList({ max }: { max?: number }) {
    const [updateSignal, setUpdateSignal] = useState(false);

    function update() {
        setUpdateSignal(!updateSignal);
    }

    useEffect(() => {
        fetchAddress().then(update);
    });

    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal">
                    <div>포트 목록</div>
                    <RequireLogin>
                        <div className="ms-auto">
                            <a href={sitemap.port.settings.path}>설정</a>
                        </div>
                    </RequireLogin>
                </Stack>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    {listAddress().slice(0, max).map((address, index) => (
                        <ListGroup.Item key={index}>
                            <Stack direction="horizontal">
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
                            </Stack>
                        </ListGroup.Item>
                    ))}
                    { max && listAddress().length > max ? (
                        <ListGroup.Item>
                            <Stack direction="horizontal">
                            <span>... {listAddress().length - max}개 생략 됨</span>
                            </Stack>
                        </ListGroup.Item>
                    ) : null }
                </ListGroup>
            </Card.Body>
            <Card.Footer>서버에 알려진 모든 포트 목록입니다</Card.Footer>
        </Card>
    );
}
