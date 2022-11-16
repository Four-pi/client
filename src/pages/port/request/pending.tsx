import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    ListGroup,
    Row,
    Stack,
    Table,
} from "react-bootstrap";
import { Request, RequestAPI, RequestMockAPI } from "../../../apis/request";

const requestApi: RequestAPI = new RequestMockAPI();

export function PendingPortRequestPage() {
    const [requests, setRequests] = useState<Request[]>([]);

    function updateRequests() {
        requestApi
            .listRequests()
            .then((requests) =>
                requests.filter((req) => req.is_approved === undefined)
            )
            .then(setRequests);
    }

    useEffect(updateRequests, []);

    return (
        <Container>
            <Row className="p-3">
                <Col>
                    <h2>처리 대기중인 요청 보기</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Card>
                        <Card.Header>요청 목록</Card.Header>
                        <Card.Body>
                            <Table className="border" striped="columns">
                                <thead>
                                    <tr>
                                        <th>포트 정보</th>
                                        <th>사용 목적</th>
                                        <th>요청 생성일</th>
                                        <th>요청 작성자</th>
                                        <th>처리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request, index) => (
                                        <tr key={index}>
                                            <td>
                                                {request.ip}:{request.port}
                                            </td>
                                            <td>{request.usage ?? ""}</td>
                                            <td>{request.created_at}</td>
                                            <td>{request.created_by.name}</td>
                                            <td>
                                                <Button
                                                    className="py-1 me-2"
                                                    variant="primary"
                                                    onClick={() =>
                                                        requestApi.approveRequest(
                                                            request.id
                                                        )
                                                    }
                                                >
                                                    승낙
                                                </Button>
                                                <Button
                                                    className="py-1"
                                                    variant="danger"
                                                    onClick={() =>
                                                        requestApi.rejectRequest(
                                                            request.id
                                                        )
                                                    }
                                                >
                                                    거절
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
