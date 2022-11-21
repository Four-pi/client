import {
    Card,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import { requestApi } from "../../../apis";
import { PortRequestForm, PortRequestFormData } from "../../../components/port-request-form";

export function PortRequestCreatePage() {
    const onSubmitHandler = ({ ip, port, usage }: PortRequestFormData) => {
        requestApi.createRequest(ip, port, usage).then(() => window.location.href = '/port/request/pending')
    }

    return (
        <Container>
            <Row className="p-3">
                <Col>
                    <h2>포트 사용 요청/요청 생성하기</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Card>
                        <Card.Header>요청 작성하기</Card.Header>
                        <Card.Body>
                            <PortRequestForm onSubmit={onSubmitHandler} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
