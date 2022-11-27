import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { api } from "../apis";
import { Request } from "../models/base";
import { RequestTable } from "../components/port-request-table";

export function PendingPortRequests() {
    const [requests, setRequests] = useState<Request[]>([]);

    function update() {
        api.port.request
            .list()
            .then((arr) => arr.filter((x) => x.is_approved === undefined))
            .then(setRequests);
    }

    console.log(requests)

    useEffect(update, []);

    return (
        <Card>
            <Card.Header>처리 대기 중인 요청 목록</Card.Header>
            <Card.Body>
                <Card.Text>아직 처리되지 않은 포트 사용 요청입니다.</Card.Text>
                <RequestTable>
                    {requests.map((req, idx) => (
                        <RequestTable.PendingItem key={idx} request={req} />
                    ))}
                </RequestTable>
            </Card.Body>
        </Card>
    );
}
