import { Badge } from "react-bootstrap";

export function PortStatusBadge({
    status,
}: {
    status: "offline" | "online-authenticated" | "online-unknown";
}) {
    const badges = {
        "offline": (
            <Badge bg="secondary" pill>
                오프라인
            </Badge>
        ),
        "online-authenticated": (
            <Badge bg="primary" pill>
                온라인 (허가됨)
            </Badge>
        ),
        "online-unknown": (
            <Badge bg="danger" pill>
                온라인 (허가되지 않음)
            </Badge>
        ),
    };
    return badges[status];
}
