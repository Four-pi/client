import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { api } from "../apis";
import { isReviewedPortRequest, Request } from "../models/base";
import { DisplayAddress } from "./address";

export function ReviewedPortRequestList() {
    const [requests, setRequests] = useState<Request[]>([]);

    function update() {
        api.port.request
            .list()
            .then((arr) => arr.filter((x) => isReviewedPortRequest(x)))
            .then(setRequests);
    }

    useEffect(update, []);

    return (
        <Card>
            <Card.Header>처리 된 요청 목록</Card.Header>
            <Card.Body>
                <Card.Text>처리가 완료된 포트 사용 요청입니다.</Card.Text>
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
                                    <DisplayAddress
                                        ip={request.ip}
                                        port={request.port}
                                    />
                                </td>
                                <td>{request.usage ?? ""}</td>
                                <td>{request.created_at}</td>
                                <td>{request.created_by.name}</td>
                                <td>{request.reviewed_by?.name}</td>
                                <td>
                                    {request.is_approved ? "승인됨" : "거부됨"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}
