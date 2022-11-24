import { Col, Container, Row } from "react-bootstrap";
import { PendingPortRequests } from "../widgets/port-request-pending-list";

export function PendingPortRequestPage() {
    return (
        <Container>
            <Row className="p-3">
                <Col>
                    <h2>처리 대기중인 요청 보기</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <PendingPortRequests />
                </Col>
            </Row>
        </Container>
    );
}
