import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { api } from "../apis";
import { isReviewedPortRequest, Request } from "../models/base";
import { DisplayAddress } from "../components/address";

export function PendingPortRequests() {
    const [requests, setRequests] = useState<Request[]>([]);

    function update() {
        api.port.request
            .list()
            .then((arr) => arr.filter((x) => !isReviewedPortRequest(x)))
            .then(setRequests);
    }

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
                                <PendingRequest request={request} />
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

function PendingRequest(props: { request: Request }) {
    const [request, setRequest] = useState<Request>(props.request);

    function update(req?: Request) {
        if (req !== undefined) {
            setRequest(req);
            return;
        }
        api.port.request
            .get(request.id)
            .then((req) => req ?? request)
            .then(update);
    }

    const onApproveHandler = () => {
        api.port.request.approve(request.id).then(update);
    };
    const onRejectHandler = () => {
        api.port.request.reject(request.id).then(update);
    };

    return (
        <>
            <td>
                <DisplayAddress ip={request.ip} port={request.port} />
            </td>
            <td>{request.usage ?? ""}</td>
            <td>{new Date(request.created_at).toLocaleString()}</td>
            <td>{request.created_by.name}</td>
            <td>
                {isReviewedPortRequest(request) ? (
                    request.is_approved ? (
                        "승낙됨"
                    ) : (
                        "거절됨"
                    )
                ) : (
                    <>
                        <Button
                            className="py-1 me-2"
                            variant="primary"
                            onClick={onApproveHandler}
                        >
                            승낙
                        </Button>
                        <Button
                            className="py-1"
                            variant="danger"
                            onClick={onRejectHandler}
                        >
                            거절
                        </Button>
                    </>
                )}
            </td>
        </>
    );
}
