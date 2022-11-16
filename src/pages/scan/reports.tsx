import { request } from "https";
import React, { useEffect, useState } from "react";
import {
    Badge,
    Col,
    Container,
    ListGroup,
    Pagination,
    Row,
} from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { Report, ReportAPI, ReportMockAPI } from "../../apis/report";
import { Request, RequestAPI, RequestMockAPI } from "../../apis/request";
import { PortStatusBadge } from "../../components/badges";

const reportApi: ReportAPI = new ReportMockAPI();
const requestApi: RequestAPI = new RequestMockAPI();

type FlattenPortStatus = "offline" | "online-authenticated" | "online-unknown";

interface FlattenPortReport {
    ip: string;
    port: string;
    service: string;
    status: FlattenPortStatus;
}

export function ScanReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [requests, setRequests] = useState<Request[]>([]);
    const [selectedReport, setSelectedReport] = useState(0);

    useEffect(() => {
        reportApi.listReports().then(setReports);
        requestApi.listRequests().then(setRequests);
    }, []);

    return (
        <Container fluid>
            <Row className="p-3">
                <h2>스캔 기록</h2>
            </Row>
            <Row className="mb-3">
                <ReportPagination
                    reports={reports}
                    page={selectedReport}
                    pageHandler={(value) => setSelectedReport(value)}
                />
            </Row>
            <Row className="mb-3">
                <Container className="px-3">{reports[selectedReport]?.created_at} 에 시행된 스캔</Container>
            </Row>
            <Row className="mb-3">
                {reports && reports.length > 0 ? (
                    <ReportAsList
                        report={reports[selectedReport]}
                        requests={requests}
                    />
                ) : (
                    <p>스캔기록이 없습니다</p>
                )}
            </Row>
        </Container>
    );
}

function ReportPagination({
    reports,
    page,
    pageHandler,
}: {
    reports: Report[];
    page: number;
    pageHandler: (page: number) => any;
}) {
    function createPageHandler(index: number) {
        return () => pageHandler(index);
    }
    return (
        <Pagination className="p-3">
            {reports.map((report, index) => (
                <Pagination.Item
                    key={index}
                    active={index === page}
                    onClick={createPageHandler(index)}
                >
                    {report.created_at}
                </Pagination.Item>
            ))}
        </Pagination>
    );
}

function ReportAsList({
    report,
    requests,
}: {
    report: Report;
    requests: Request[];
}) {
    const flattenReports: FlattenPortReport[] = [];

    report.ip_reports.forEach((ipRep) =>
        ipRep.port_reports.forEach((portRep) => {
            flattenReports.push({
                ip: ipRep.ip,
                port: portRep.port,
                service: portRep.service,
                status: getPortStatus(ipRep.ip, portRep.port, requests)
            });
        })
    );
    requests.filter(req => flattenReports.find(rep => rep.ip === req.ip && rep.port === req.port) === undefined).forEach(req => {
        flattenReports.push({
            ip: req.ip,
            port: req.port,
            service: '',
            status: "offline"
        });
    })

    return (
        <>
            <Col xs={8}>
                <ListGroup>
                    {flattenReports.map(renderFlattenPortReport)}
                </ListGroup>
            </Col>
            <Col xs={4}>
                <Doughnut data={createChartData(flattenReports)} />
            </Col>
        </>
    );
}

function getPortStatus(ip: string, port: string, requests: Request[]): "online-authenticated" | "online-unknown" {
    if (requests.find(req => req.ip === ip && req.port === port && req.is_approved)) {
        return "online-authenticated";
    }
    return "online-unknown";
}

function renderFlattenPortReport(report: FlattenPortReport) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <span>
                {report.ip}:{report.port}{" "}
                <span style={{ color: "gray" }}>{report.service}</span>
            </span>
            <PortStatusBadge status={report.status} />
        </ListGroup.Item>
    );
}

function createChartData(reports: FlattenPortReport[]) {
    return {
        labels: ["오프라인", "온라인 (허가됨)", "온라인 (허가되지 않음)"],
        datasets: [
            {
                label: "Nmap 스캔 결과",
                data: [
                    reports.filter((r) => r.status === "offline").length,
                    reports.filter((r) => r.status === "online-authenticated")
                        .length,
                    reports.filter((r) => r.status === "online-unknown").length,
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
}
