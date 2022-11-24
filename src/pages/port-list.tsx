import { Col, Container, Row } from "react-bootstrap";
import { PortList } from "../widgets/port-list";

// TODO: request api를 이용하여 getActivePort 만으로 알잘딱하기.

export function PortListPage() {
    return (
        <Container>
            <Row className="my-3">
                <Col>
                    <h2>포트 관리/포트 목록 보기</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <PortList />
                </Col>
            </Row>
        </Container>
    );
}
