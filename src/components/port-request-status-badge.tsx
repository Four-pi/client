import { Badge } from "react-bootstrap";
import { Request } from "../models/base";

export function PortRequestStatusBadge({ request }: { request: Request }) {
    if (request.is_approved === undefined) {
        return (
            <Badge bg="warning" pill>
                검토 대기중
            </Badge>
        );
    }
    if (request.is_approved) {
        return (
            <Badge bg="success" pill>
                허가됨
            </Badge>
        );
    }
    return (
        <Badge bg="danger" pill>
            거부됨
        </Badge>
    );
}
