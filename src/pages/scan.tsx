import React from "react";
import {
    Badge,
    Col,
    Container,
    ListGroup,
    Pagination,
    Row,
} from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

interface NmapScanReport {
    host: string;
    isHostDown: boolean;
    isAllowed: boolean;
    service?: string;
}

export class Scan extends React.Component<any, { reports: NmapScanReport[] }> {
    constructor() {
        super({});
        this.state = {
            reports: [
                {
                    host: "127.0.0.0",
                    service: "ssh",
                    isHostDown: true,
                    isAllowed: true,
                },
                {
                    host: "localhost",
                    service: "ssh",
                    isHostDown: false,
                    isAllowed: true,
                },
                {
                    host: "127.0.0.2",
                    service: "ssh",
                    isHostDown: true,
                    isAllowed: true,
                },
                {
                    host: "127.0.0.3",
                    service: "ssh",
                    isHostDown: true,
                    isAllowed: true,
                },
                {
                    host: "127.0.0.4",
                    service: "ssh",
                    isHostDown: true,
                    isAllowed: true,
                },
                {
                    host: "127.0.0.5",
                    service: "ssh",
                    isHostDown: true,
                    isAllowed: true,
                },
                {
                    host: "127.0.0.6",
                    service: "ssh",
                    isHostDown: true,
                    isAllowed: true,
                },
                {
                    host: "127.0.0.7",
                    service: "ssh",
                    isHostDown: false,
                    isAllowed: false,
                },
                {
                    host: "127.0.0.8",
                    service: "ssh",
                    isHostDown: false,
                    isAllowed: true,
                },
                {
                    host: "127.0.0.9",
                    service: "ssh",
                    isHostDown: false,
                    isAllowed: false,
                },
                {
                    host: "127.0.0.10",
                    service: "ssh",
                    isHostDown: true,
                    isAllowed: true,
                },
            ],
        };
    }

    parseData() {
        const data = [0, 0, 0];
        this.state.reports.forEach((r) => {
            if (r.isHostDown) {
                data[0] += 1;
            } else if (r.isAllowed) {
                data[1] += 1;
            } else {
                data[2] += 1;
            }
        });
        return {
            labels: ["오프라인", "온라인 (허가됨)", "온라인 (허가되지 않음)"],
            datasets: [
                {
                    label: "Nmap 스캔 결과",
                    data,
                    backgroundColor: [
                        "rgb(108,117,125)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 99, 132)",
                    ],
                    hoverOffset: 4,
                },
            ],
        };
    }

    render() {
        const { reports } = this.state;
        return (
            <Container>
                <Row className="p-3">
                    <Col>
                        <h2>스캔 기록</h2>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Pagination className="p-3">
                            <Pagination.Item key={1} active>
                                2022-11-14
                            </Pagination.Item>
                            <Pagination.Item key={2}>
                                2022-11-13 19:01:00
                            </Pagination.Item>
                            <Pagination.Item key={2}>
                                2022-11-13 06:55:07
                            </Pagination.Item>
                            <Pagination.Item key={3}>
                                2022-11-12
                            </Pagination.Item>
                            <Pagination.Item key={4}>
                                2022-11-11
                            </Pagination.Item>
                            <Pagination.Item key={5}>
                                2022-11-10
                            </Pagination.Item>
                            <Pagination.Item key={6}>
                                2022-11-09
                            </Pagination.Item>
                            <Pagination.Item key={7}>
                                2022-11-08
                            </Pagination.Item>
                            <Pagination.Item key={8}>
                                2022-11-07
                            </Pagination.Item>
                            <Pagination.Item key={9}>
                                2022-11-06
                            </Pagination.Item>
                        </Pagination>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={8}>
                        <ListGroup>
                            {reports.map((r) => (
                                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                    <span>
                                        {r.host}
                                        &nbsp;
                                        <span style={{ color: "gray" }}>
                                            {r.service ?? ""}
                                        </span>
                                    </span>
                                    <NampScanReportBadge report={r} />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col xs={4}>
                        <Doughnut data={this.parseData()} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

function NampScanReportBadge({ report }: { report: NmapScanReport }) {
    let backgroundColor: string;
    let text: string;

    if (report.isHostDown) {
        backgroundColor = "secondary";
        text = "오프라인";
    } else if (report.isAllowed) {
        backgroundColor = "primary";
        text = "온라인 (허가됨)";
    } else {
        backgroundColor = "danger";
        text = "온라인 (허가되지 않음)";
    }
    return (
        <Badge bg={backgroundColor} pill>
            {text}
        </Badge>
    );
}
