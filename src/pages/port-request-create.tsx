import { Col, Container, Row } from "react-bootstrap";
import { PortRequestCreate } from "../components/port-request-create";

export function PortRequestCreatePage() {
    return (
        <Container>
            <Row className="p-3">
                <Col>
                    <h2>포트 사용 요청/요청 생성하기</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <PortRequestCreate />
                </Col>
            </Row>
        </Container>
    );
}
