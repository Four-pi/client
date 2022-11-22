import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { portApi } from "../apis";
import { Port } from "../models/base";

export function ActivePortStatistic() {
    const [ports, setPorts] = useState<Port[]>([]);
    const [activePorts, setActivePorts] = useState<Port[]>([]);

    useEffect(() => {
        portApi.listPorts().then(setPorts);
        portApi.getActivePorts().then(setActivePorts);
    }, []);

    const allowedPorts = ports.filter((p) => p.is_open);

    return (
        <Card>
            <Card.Header>현재 활성화 된 포트 통계</Card.Header>
            <Card.Body>
                <Card.Title>
                    {activePorts.length} / {allowedPorts.length} Hosts
                </Card.Title>
            </Card.Body>
                <Card.Footer>온라인인 포트 개수 / 허가된 포트 개수</Card.Footer>
        </Card>
    );
}
