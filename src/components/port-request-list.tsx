import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { requestApi } from "../apis";
import { Request } from "../models/base";
import { Address } from "./address";
import { PortRequestStatusBadge } from "./port-request-status-badge";

export function PortRequestList() {
    const [requests, setRequests] = useState<Request[]>([]);

    function update() {
        requestApi.listRequests().then(setRequests);
    }

    useEffect(update, []);

    return (
        <Card className="mb-3">
            <Card.Header>최근 포트 사용 요청</Card.Header>
            <Card.Body>
                <ListGroup as="ul">
                    {requests.map((req, index) => (
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            key={index}
                        >
                            <div className="ms-2 me-auto">
                                <Address ip={req.ip} port={req.port} />
                                <div>
                                    by {req.created_by.name} at {new Date(req.created_at).toLocaleString()}
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
