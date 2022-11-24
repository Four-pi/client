import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Stack } from "react-bootstrap";
import { api } from "../apis";
import { ScanTarget } from "../models/base";
import { DisplayAddress } from "./address";

export function ScanAddressList() {
    const [scanTargets, setScanTargets] = useState<ScanTarget[]>([]);

    function updateScanTargets() {
        api.scan.target.list().then(setScanTargets);
    }

    useEffect(() => {
        updateScanTargets();
    }, []);

    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal">
                    <div>스캔 대상 IP 주소 목록</div>
                    <Button className="ms-auto" onClick={updateScanTargets}>새로고침</Button>
                </Stack>
            </Card.Header>
            <Card.Body>
                <Card.Text>아래의 목록에 있는 주소를 대상으로 Nmap 스캔이 시행됩니다.</Card.Text>
                <ListGroup>
                    {scanTargets.map((scanTarget, index) => (
                        <ListGroup.Item key={index}>
                            <DisplayAddress
                                ip={scanTarget.ip}
                                subnetMask={scanTarget.subnet_mask}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
