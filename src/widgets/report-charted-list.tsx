import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";
import { fetchAddress, listReport } from "../models/address-status";
import type { Report } from "../models/base";
import { ReportChart } from "../components/report-chart";
import { ReportList } from "../components/report-list";
import { ReportListPagination } from "../components/report-list-pagination";
import { RequireLogin } from "../components/require-login";

export function ReportChartedList() {
    const [selectedReport, setSelectedReport] = useState<Report | undefined>(
        undefined
    );

    useEffect(() => {
        fetchAddress().then(() => {
            setSelectedReport(listReport()?.[0]);
        });
    });

    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal">
                    날짜별 스캔 기록
                    <RequireLogin>
                        <div className="ms-auto">
                            <a href="/scan/settings">스캔 설정</a>
                        </div>
                    </RequireLogin>
                </Stack>
            </Card.Header>
            <Card.Body>
                <RequireReport
                    report={selectedReport}
                    onEmpty={<Card.Text>스캔 기록이 없습니다.</Card.Text>}
                >
                    <ReportListPagination
                        selectedReport={selectedReport!}
                        onSelect={setSelectedReport}
                    />
                    <Card>
                        <Card.Body>
                            <Container fluid>
                                <Row>
                                    <Col xs={8}>
                                        <ReportList report={selectedReport!} />
                                    </Col>
                                    <Col xs={4}>
                                        <ReportChart report={selectedReport!} />
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </RequireReport>
            </Card.Body>
            <Card.Footer>
                <RequireReport report={selectedReport}>
                    <div>
                        {new Date(selectedReport!.created_at).toLocaleString()}{" "}
                        에 시행된 스캔
                    </div>
                </RequireReport>
            </Card.Footer>
        </Card>
    );
}

function RequireReport(
    props: any | { report?: Report; onEmpty?: JSX.Element }
) {
    if (!props.report) return props.onEmpty ?? null;

    return props.children ?? null;
}
