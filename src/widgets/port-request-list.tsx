import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { api } from "../apis";
import { Request } from "../models/base";
import { DisplayAddress } from "../components/address";
import { PortRequestStatusBadge } from "../components/port-request-status-badge";

export function PortRequestList() {
    const [requestList, setRequestList] = useState<Request[]>([]);

    function update() {
        api.port.request.list().then(setRequestList);
    }

    useEffect(update, []);

    return (
        <Card className="mb-3">
            <Card.Header>최근 포트 사용 요청</Card.Header>
            <Card.Body>
                <ListGroup as="ul">
                    {requestList.map((req, index) => (
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            key={index}
                        >
                            <div className="ms-2 me-auto">
                                <DisplayAddress ip={req.ip} port={req.port} />
                                <div>
                                    by {req.created_by?.name ?? '?'} at {new Date(req.created_at).toLocaleString()}
                                </div>
                            </div>
                            <PortRequestStatusBadge request={req} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
            <Card.Footer>최근에 생성된 요청 목록입니다</Card.Footer>
        </Card>
    );
}
