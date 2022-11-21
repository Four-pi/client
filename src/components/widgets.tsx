import { useEffect, useState } from "react";
import {
    Badge,
    Card,
    ListGroup,
    Stack,
} from "react-bootstrap";
import type { MachineStatus, Port, Request } from "../models/base";
import * as apis from "../apis";
import { MachineStatusCard } from "./machineStatus";

export function MachineStatusWidget() {
    const [usageState, setUsageState] = useState<MachineStatus>({
        cpu: undefined,
        disk: undefined,
        memory: undefined,
        network: undefined,
    });
    useEffect(() => {
        apis.machineStatusApi.monitor().then(setUsageState);
    }, [
        usageState
    ]);
    return (
        <Card className="mb-3">
            <Card.Header>장치 부하 상태</Card.Header>
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    <MachineStatusCard status={usageState} />
                </Stack>
            </Card.Body>
        </Card>
    );
}

export function RecentlyOpenedAddressWidget() {
    const [ports, setPorts] = useState<Port[]>([]);

    function updateRequests() {
        apis.portApi
            .listPorts()
            .then((port) => port.filter((p) => p.is_open))
            .then(setPorts);
    }

    useEffect(updateRequests, []);

    return (
        <Card className="mb-3">
            <Card.Header>신규 Open 주소</Card.Header>
            <Card.Body>
                <ListGroup>
                    {ports.map((port, index) => (
                        <ListGroup.Item key={index}>
                            <Stack>
                                <div className="fw-bold">
                                    {port.ip}
                                    <span style={{ color: "gray" }}>
                                        :{port.port}
                                    </span>
                                </div>
                            </Stack>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export function IPChangeHistoryWidget() {
    const [requests, setRequests] = useState<Request[]>([]);

    useEffect(() => {
        apis.requestApi.listRequests().then(setRequests);
    }, []);

    return (
        <Card className="mb-3">
            <Card.Header>최근 IP 변경 사항</Card.Header>
            <Card.Body>
                <ListGroup as="ul">{requests.map(renderRequest)}</ListGroup>
            </Card.Body>
        </Card>
    );
}

function renderRequest(request: Request, index: number) {
    const badges = {
        approved: (
            <Badge bg="success" pill>
                허가됨
            </Badge>
        ),
        rejected: (
            <Badge bg="danger" pill>
                거부됨
            </Badge>
        ),
        pending: (
            <Badge bg="warning" pill>
                검토 대기중
            </Badge>
        ),
    };
    function getBadgeType(): "approved" | "rejected" | "pending" {
        if (request.reviewed_at === undefined) return "pending";
        if (request.is_approved) {
            return "approved";
        }
        return "rejected";
    }

    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={index}
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    {request.ip}
                    <span style={{ color: "gray" }}>:{request.port}</span>
                </div>
                <div>
                    <span>by {request.created_by.name}</span>
                    <span> at {request.created_at}</span>
                </div>
            </div>
            {badges[getBadgeType()]}
        </ListGroup.Item>
    );
}
