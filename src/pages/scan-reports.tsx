import { Col, Container, Row } from "react-bootstrap";
import { ReportList } from "../components/report-list";

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
                    <ReportList />
                </Col>
            </Row>
        </Container>
    );
}
