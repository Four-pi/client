import React from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    Row,
    Stack,
} from "react-bootstrap";
import { RequestAPI, RequestMockAPI } from "../../../apis/request";

const requestApi: RequestAPI = new RequestMockAPI();

export function PortRequestCreatePage() {
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const { ip, port, usage } = event.target as typeof event.target & {
            ip: HTMLInputElement;
            port: HTMLInputElement;
            usage: HTMLInputElement;
        };
        requestApi.createRequest(ip.value, port.value, usage.value);
    };

    return (
        <Container fluid>
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
                            <PortOpenRequestForm onSubmit={onSubmit} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

function PortOpenRequestForm({
    onSubmit,
}: {
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
}) {
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>IP 주소 / 포트 번호</Form.Label>
                <InputGroup>
                    <Form.Control
                        name="ip"
                        type="text"
                        placeholder="127.0.0.1"
                        required
                    />
                    <InputGroup.Text>:</InputGroup.Text>
                    <Form.Control
                        name="port"
                        type="number"
                        placeholder="80"
                        min={0}
                        required
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>사용 목적</Form.Label>
                <InputGroup>
                    <Form.Control
                        name="usage"
                        type="text"
                        placeholder="자세히 적어주세요"
                        required
                    />
                </InputGroup>
            </Form.Group>
            <Stack>
                <Button type="submit">규칙 추가</Button>
            </Stack>
        </Form>
    );
}
