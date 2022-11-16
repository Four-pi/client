import { useEffect, useState } from "react";
import {
    Badge,
    Card,
    Col,
    Container,
    ListGroup,
    ProgressBar,
    Row,
    Stack,
} from "react-bootstrap";
import type { MachineStatus, MachineStatusAPI } from "../apis/machine";
import { MachineStatusMockAPI } from "../apis/machine";
import { Port, PortAPI, PortMockAPI } from "../apis/port";
import { Request, RequestAPI, RequestMockAPI } from "../apis/request";

const machineStatusAPI: MachineStatusAPI = new MachineStatusMockAPI();
const portAPI: PortAPI = new PortMockAPI();
const requestAPI: RequestAPI = new RequestMockAPI();

export function MachineStatusWidget() {
    const [usageState, setUsageState] = useState<MachineStatus>({
        cpu: undefined,
        disk: undefined,
        memory: undefined,
        network: undefined,
    });
    useEffect(() => {
        machineStatusAPI.monitor().then(setUsageState);
    });
    return (
        <Card className="mb-3">
            <Card.Header>장치 부하 상태</Card.Header>
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    {Object.entries(usageState).map(([key, value], index) => {
                        let label: string =
                            key.slice(0, 1).toUpperCase() +
                            key.slice(1).toLowerCase();
                        let text: string = "로딩 중...";
                        let percentage = 100;
                        if (value !== undefined) {
                            percentage = Math.ceil(value * 100);
                            text = `${percentage}%`;
                        }
                        return (
                            <Card style={{ width: "100%" }} key={index}>
                                <Card.Header>{label}</Card.Header>
                                <Card.Body>
                                    <ProgressBar
                                        className="mb-2"
                                        now={percentage}
                                        animated
                                    />
                                    <Card.Text className="text-end">
                                        {text}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Stack>
            </Card.Body>
        </Card>
    );
}

export function ActiveAddressWidget() {
    const [numberOfActivePorts, setNumberOfActivePorts] = useState(0);
    const [numberOfAllowedPorts, setNumberOfAllowedPorts] = useState(0);

    useEffect(() => {
        portAPI
            .getActivePorts()
            .then((ports) => setNumberOfActivePorts(ports.length));
        portAPI
            .listPorts()
            .then((ports) =>
                setNumberOfAllowedPorts(ports.filter((p) => p.is_open).length)
            );
    });

    return (
        <Card className="mb-3">
            <Card.Header>활성화된 주소 현황</Card.Header>
            <Card.Body>
                <Card.Title>
                    {numberOfActivePorts} / {numberOfAllowedPorts} Hosts
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

export function RecentlyOpenedAddressWidget() {
    const [ports, setPorts] = useState<Port[]>([]);

    function updateRequests() {
        portAPI
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
        requestAPI.listRequests().then(setRequests);
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
