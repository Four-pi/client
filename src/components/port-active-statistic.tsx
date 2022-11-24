import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { fetchAddress } from "../models/address-status";

export function ActivePortStatistic() {
    const [ countOnline, setCountOnline ] = useState(0);
    const [ countAuthorized, setCountAuthorized ] = useState(0);

    useEffect(() => {
        fetchAddress().then(addressList => {
            setCountOnline(addressList.filter(addr => addr.isOnline).length);
            setCountAuthorized(addressList.filter(addr => addr.isAuthorized).length);
        });
    }, []);

    return (
        <Card>
            <Card.Header>현재 활성화 된 포트 통계</Card.Header>
            <Card.Body>
                <Card.Title>
                    {countOnline} / {countAuthorized} Hosts
                </Card.Title>
            </Card.Body>
                <Card.Footer>온라인인 포트 개수 / 허가된 포트 개수</Card.Footer>
        </Card>
    );
}
