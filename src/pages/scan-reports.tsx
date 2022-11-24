import { Col, Container, Row } from "react-bootstrap";
import { ReportChartedList } from "../widgets/report-charted-list";

export function ScanReportsPage() {
    return (
        <Container>
            <Row className="my-3">
                <Col>
                    <h2>스캔 기록</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <ReportChartedList />
                </Col>
            </Row>
        </Container>
    );
}
