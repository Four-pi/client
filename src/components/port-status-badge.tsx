import { Badge } from "react-bootstrap";

interface PortStatusBadgeProps {
    isOnline?: boolean;
    isAuthenticated?: boolean;
}

export function PortStatusBadge({
    isOnline,
    isAuthenticated,
}: PortStatusBadgeProps) {
    return (
        <Badge pill bg={getBg(isOnline, isAuthenticated)}>
            {getText(isOnline, isAuthenticated)}
        </Badge>
    );
}

function getBg(isOnline?: boolean, isAuthenticated?: boolean): string {
    if (!isOnline) return "secondary";
    if (isAuthenticated) return "primary";
    return "danger";
}

function getText(isOnline?: boolean, isAuthenticated?: boolean): string {
    return `${isOnline ? "온라인" : "오프라인"}${
        isAuthenticated === undefined
            ? ""
            : ` (${isAuthenticated ? "허가됨" : "허가되지 않음"})`
    }`;
}
