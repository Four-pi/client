import { useEffect, useState } from "react";
import { Card, Col, Container, Pagination, Row, Stack } from "react-bootstrap";
import { fetchAddress, listReport } from "../models/core";
import type { Report } from "../models/base";
import { ReportChart } from "../components/report-chart";
import { ReportList } from "../components/report-list";
import { RequiresLoggedIn } from "../components/conditional-component";
import { ConditionalComponent } from "../components/conditional-component";

export function ReportChartedList() {
    const [reportList, setReportList] = useState<Report[]>([]);
    const [selectedReportIdx, setSelectedReportIdx] = useState(0);

    useEffect(() => {
        fetchAddress().then(() => {
            setReportList(listReport());
        });
    }, []);

    const onPageSelectHandlerFactory = (index: number) => () => {
        setSelectedReportIdx(index);
    };

    const selectedReport = reportList.length > selectedReportIdx ? reportList[selectedReportIdx] : undefined;

    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal">
                    날짜별 스캔 기록
                    <RequiresLoggedIn>
                        <div className="ms-auto">
                            <a href="/scan/settings">스캔 설정</a>
                        </div>
                    </RequiresLoggedIn>
                </Stack>
            </Card.Header>
            <Card.Body>
                <ConditionalComponent when={selectedReport !== undefined}>
                    <Pagination>
                        {reportList.map((report, index) => (
                            <Pagination.Item
                                key={index}
                                active={index === selectedReportIdx}
                                onClick={onPageSelectHandlerFactory(index)}
                            >
                                {new Date(report.created_at).toLocaleString()}
                            </Pagination.Item>
                        ))}
                    </Pagination>
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
                </ConditionalComponent>
                <ConditionalComponent when={selectedReportIdx === undefined}>
                    <Card.Text>스캔 기록이 없습니다.</Card.Text>
                </ConditionalComponent>
            </Card.Body>
            <Card.Footer>
                <ConditionalComponent when={selectedReportIdx !== undefined}>
                    <div>{selectedReport?.created_at} 에 시행된 스캔</div>
                </ConditionalComponent>
            </Card.Footer>
        </Card>
    );
}
