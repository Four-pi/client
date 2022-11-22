import { useEffect, useState } from "react";
import {
    Card,
    Col,
    Container,
    Row,
    Table,
} from "react-bootstrap";
import type { Request } from "../models/base";
import * as apis from "../apis";

export function ReviewedPortRequestPage() {
    const [requests, setRequests] = useState<Request[]>([]);

    function updateRequests() {
        apis.requestApi
            .listRequests()
            .then((requests) =>
                requests.filter((req) => req.is_approved !== undefined)
            )
            .then(setRequests);
    }

    useEffect(updateRequests, []);

    return (
        <Container>
            <Row className="p-3">
                <Col>
                    <h2>처리된 요청 보기</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Card>
                        <Card.Header>요청 목록</Card.Header>
                        <Card.Body>
                            <Table striped="columns" className="border">
                                <thead>
                                    <tr>
                                        <th>포트 정보</th>
                                        <th>사용 목적</th>
                                        <th>요청 생성일</th>
                                        <th>요청 작성자</th>
                                        <th>리뷰어</th>
                                        <th>처리결과</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request, index) => (
                                        <tr key={index}>
                                            <td>
                                                {request.ip}:{request.port}
                                            </td>
                                            <td>
                                                {request.usage ?? ''}
                                            </td>
                                            <td>{request.created_at}</td>
                                            <td>{request.created_by.name}</td>
                                            <td>{request.reviewed_by?.name}</td>
                                            <td>
                                                {request.is_approved
                                                    ? "승인됨"
                                                    : "거부됨"}
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
