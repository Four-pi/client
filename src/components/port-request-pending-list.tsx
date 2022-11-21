import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { requestApi } from "../apis";
import { Request } from "../models/base";
import { Address } from "./address";

export function PendingPortRequests() {
    const [requests, setRequests] = useState<Request[]>([]);

    function update() {
        requestApi
            .listRequests()
            .then((requests) => requests.filter((r) => r.is_approved))
            .then(setRequests);
    }

    const createOnApproveHandler = (id: string) => () => {
        requestApi.approveRequest(id).then(update);
    };
    const createOnRejectHandler = (id: string) => () => {
        requestApi.approveRequest(id).then(update);
    };

    useEffect(update, []);

    return (
        <Card>
            <Card.Header>처리 대기 중인 요청 목록</Card.Header>
            <Card.Body>
                <Card.Text>아직 처리되지 않은 포트 사용 요청입니다.</Card.Text>
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
                                    <Address ip={request.ip} port={request.port} />
                                </td>
                                <td>{request.usage ?? ""}</td>
                                <td>{new Date(request.created_at).toLocaleString()}</td>
                                <td>{request.created_by.name}</td>
                                <td>
                                    <Button
                                        className="py-1 me-2"
                                        variant="primary"
                                        onClick={createOnApproveHandler(request.id)}
                                    >
                                        승낙
                                    </Button>
                                    <Button
                                        className="py-1"
                                        variant="danger"
                                        onClick={createOnRejectHandler(request.id)}
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
    );
}
