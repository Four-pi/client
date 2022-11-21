import { useEffect, useState } from "react";
import {
    Card,
    Col,
    Container,
    ListGroup,
    Pagination,
    Row,
    Stack,
} from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { reportApi, requestApi } from "../apis";
import type { Report } from "../models/base";
import {
    SimplifiedReport,
    SimplifiedReportRepository,
} from "../models/simplified-report";
import { Address } from "./address";
import { PortStatusBadge } from "./port-status-badge";

export function ReportList() {
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState(0);
    const [repository, setRepository] = useState<SimplifiedReportRepository>(
        new SimplifiedReportRepository([], [])
    );

    useEffect(() => {
        async function fetchData() {
            const reports = await reportApi.listReports();
            const requests = await requestApi.listRequests();
            setReports(reports);
            setRepository(new SimplifiedReportRepository(reports, requests));
        }
        fetchData();
    }, []);

    const createPageHandler = (index: number) => {
        return () => setSelectedReport(index);
    };

    const report: Report = reports[selectedReport];
    const isEmpty = reports.length === 0;
    const simplifiedReports = repository.getByReport(report?.id);
    const chartData = {
        labels: ["오프라인", "온라인 (허가됨)", "온라인 (허가되지 않음)"],
        datasets: [
            {
                label: "Nmap 스캔 결과",
                data: [
                    simplifiedReports.filter((r) => !r.isOnline).length,
                    simplifiedReports.filter(
                        (r) => r.isOnline && r.isAuthenticated
                    ).length,
                    simplifiedReports.filter(
                        (r) => r.isOnline && !r.isAuthenticated
                    ).length,
                ],
                backgroundColor: [
                    "rgb(108,117,125)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 99, 132)",
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal">
                    날짜별 스캔 기록
                    <div className="ms-auto">
                        <a href="/scan/settings">스캔 설정</a>
                    </div>
                </Stack>
            </Card.Header>
            <Card.Body>
                {isEmpty ? (
                    <Card.Text>스캔 기록이 없습니다.</Card.Text>
                ) : (
                    <>
                        <Pagination>
                            {reports.map((report, index) => (
                                <Pagination.Item
                                    key={index}
                                    active={index === selectedReport}
                                    onClick={createPageHandler(index)}
                                >
                                    {new Date(
                                        report.created_at
                                    ).toLocaleString()}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                        <Card>
                            <Card.Body>
                                <Stack direction="horizontal">
                                    <div style={{ width: "100%" }}>
                                        <ListGroup>
                                            {simplifiedReports.map(
                                                (report, index) => (
                                                    <ListGroup.Item key={index}>
                                                        {renderSimplifiedReport(
                                                            report
                                                        )}
                                                    </ListGroup.Item>
                                                )
                                            )}
                                        </ListGroup>
                                    </div>
                                    <div>
                                        <Doughnut data={chartData} />
                                    </div>
                                </Stack>
                                <Container fluid>
                                    <Row>
                                        <Col xs={8}></Col>
                                        <Col xs={4}></Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </>
                )}
            </Card.Body>
            <Card.Footer>
                {isEmpty ? null : <div>{report.created_at} 에 시행된 스캔</div>}
            </Card.Footer>
        </Card>
    );
}

function renderSimplifiedReport(report: SimplifiedReport) {
    return (
        <Stack direction="horizontal" gap={3}>
            <div>
                <Address ip={report.ip} port={report.port} />
            </div>
            {report.service ? (
                <div>
                    <span style={{ color: "lightgray" }}>service: </span>
                    <span style={{ color: "gray" }}>{report.service}</span>
                </div>
            ) : null}
            <div className="ms-auto">
                <PortStatusBadge
                    isOnline={report.isOnline}
                    isAuthenticated={report.isAuthenticated}
                />
            </div>
        </Stack>
    );
}
