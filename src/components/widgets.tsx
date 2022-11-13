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
import type { AddressInfo, MachineUsageState } from "../api";
import { APIController } from "../api";
import { sleep } from "../utils";


export function MachineStatusWidget() {
    const [usageState, setUsageState] = useState<MachineUsageState>({
        cpu: undefined,
        disk: undefined,
        memory: undefined,
        network: undefined,
    });
    useEffect(() => {
        async function fetchData() {
            await sleep(200);
            const usageState =
                await APIController.instance.getMachineUsageState();
            setUsageState(usageState);
        }
        fetchData();
    });
    return (
        <Card className="mb-3">
            <Card.Header>장치 부하 상태</Card.Header>
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    {Object.entries(usageState).map(([key, value]) => {
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
                            <Card style={{ width: "100%" }}>
                                <Card.Header>{label}</Card.Header>
                                <Card.Body>
                                    <Card.Text className="text-end">
                                        <ProgressBar
                                            now={percentage}
                                            animated
                                        />
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

interface TicketCountData {
    openedAddressList: AddressInfo[];
    activeAddressList: AddressInfo[];
    isLoaded: boolean;
}

export function ActiveAddressWidget() {
    const [data, setData] = useState<TicketCountData>({
        openedAddressList: [],
        activeAddressList: [],
        isLoaded: false,
    });
    useEffect(() => {
        async function fetchData() {
            if (data.isLoaded) return;

            setData({
                openedAddressList:
                    await APIController.instance.getOpenedAddressInfo(),
                activeAddressList:
                    await APIController.instance.getActiveAddressInfo(),
                isLoaded: false,
            });
        }
        fetchData();
    });
    return (
        <Card className="mb-3">
            <Card.Header>활성화된 주소 현황</Card.Header>
            <Card.Body>
                <Card.Title>
                    {data.activeAddressList.length}/
                    {data.openedAddressList.length} Hosts
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

export function RecentlyOpenedAddressWidget() {
    const data = {
        labels: ["22", "21", "?"],
        datasets: [
            {
                label: "My First Dataset",
                data: [300, 50, 100],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                ],
                hoverOffset: 4,
            },
        ],
    };
    return (
        <Card className="mb-3">
            <Card.Header>신규 Open 주소</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs="7">
                            Data
                        </Col>
                        <Col xs="5">
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

interface History {
    ipv4: string;
    lastmod: string;
    isSuccessful: boolean;
}
const histories: History[] = [
    {
        ipv4: "127.0.0.1",
        lastmod: new Date().toISOString(),
        isSuccessful: true,
    },
    {
        ipv4: "localhost",
        lastmod: new Date("2022-11-07").toISOString(),
        isSuccessful: false,
    },
];

export function IPChangeHistoryWidget() {
    return (
        <Card className="mb-3">
            <Card.Header>최근 IP 변경 사항</Card.Header>
            <Card.Body>
                <ListGroup as="ul">
                    {histories.map(createHistoryItem)}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

function createHistoryItem(history: History) {
    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{history.ipv4}</div>
                {history.lastmod}
            </div>
            <Badge bg={history.isSuccessful ? "success" : "danger"} pill>
                {history.isSuccessful ? "성공" : "실패"}
            </Badge>
        </ListGroup.Item>
    );
}
