import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { api } from "../apis";
import { isReviewedPortRequest, Request } from "../models/base";
import { RequestTable } from "../components/port-request-table";

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
                <RequestTable>
                    {requests.map((req, idx) => (
                        <RequestTable.ReviewedItem key={idx} request={req} />
                    ))}
                </RequestTable>
            </Card.Body>
        </Card>
    );
}
