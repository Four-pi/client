import { Col, Container, Row } from "react-bootstrap";
import { ReviewedPortRequestList } from "../widgets/port-request-reviewed-list";

export function ReviewedPortRequestPage() {
    return (
        <Container>
            <Row className="p-3">
                <Col>
                    <h2>처리된 요청 보기</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <ReviewedPortRequestList />
                </Col>
            </Row>
        </Container>
    );
}
