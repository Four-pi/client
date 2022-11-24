import { useEffect, useState } from "react";
import { Card, ListGroup, Stack } from "react-bootstrap";
import { PortStatusBadge } from "../components/port-status-badge";
import { sitemap } from "../router";
import { DisplayAddress } from "../components/address";
import { fetchAddress, listAddress } from "../models/core";
import {
    ConditionalComponent,
    RequiresLoggedIn,
} from "../components/conditional-component";

export function PortList({ max }: { max?: number }) {
    const [updateSignal, setUpdateSignal] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);

    function update() {
        setUpdateSignal(!updateSignal);
    }

    const onExpandHander = () => {
        setIsCollapsed(false);
    };

    useEffect(() => {
        fetchAddress().then(update);
    }, [updateSignal]);

    const addressList = listAddress();
    const revealedAddressList = isCollapsed
        ? addressList.slice(0, max)
        : addressList;
    const countHiddenAddress = addressList.length - revealedAddressList.length;

    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal" gap={3}>
                    <div className="me-auto">포트 목록</div>
                    <RequiresLoggedIn>
                        <div>
                            <a href={sitemap.port.settings.path}>설정</a>
                        </div>
                    </RequiresLoggedIn>
                </Stack>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    {revealedAddressList.map((address, index) => (
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
                </ListGroup>
            </Card.Body>
            <Card.Footer>
                <Stack direction="horizontal" gap={3}>
                    <div>서버에 알려진 모든 포트 목록입니다</div>
                    <ConditionalComponent
                        when={isCollapsed && countHiddenAddress > 0}
                    >
                        <div className="ms-auto">
                            <span> (... {countHiddenAddress}개 생략 됨) </span>
                        </div>
                        <div>
                            <a href="" onClick={onExpandHander}>
                                펼치기
                            </a>
                        </div>
                    </ConditionalComponent>
                </Stack>
            </Card.Footer>
        </Card>
    );
}
