import { useEffect, useState } from "react";
import { Card, ListGroup, Stack } from "react-bootstrap";
import { PortStatusBadge } from "../components/port-status-badge";
import { sitemap } from "../router";
import { DisplayAddress } from "../components/address";
import { RequireLogin } from "../components/require-login";
import { fetchAddress, listAddress } from "../models/address-status";
import { ConditionalComponent } from "../components/conditional-component";

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
                <Stack direction="horizontal">
                    <div>포트 목록</div>
                    <ConditionalComponent condition={isCollapsed}>
                        <a href="#" onClick={onExpandHander}>
                            펼치기
                        </a>
                    </ConditionalComponent>
                    <RequireLogin>
                        <div className="ms-auto">
                            <a href={sitemap.port.settings.path}>설정</a>
                        </div>
                    </RequireLogin>
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
                <Stack direction="horizontal">
                    <div>서버에 알려진 모든 포트 목록입니다</div>
                    {isCollapsed ? (
                        <div className="ms-auto">
                            <span> (... {countHiddenAddress}개 생략 됨) </span>
                        </div>
                    ) : null}
                </Stack>
            </Card.Footer>
        </Card>
    );
}
