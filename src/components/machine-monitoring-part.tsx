import { Card, ProgressBar } from "react-bootstrap";

interface Props {
    label: string;
    percentage: number | undefined;
}

export function MachineMonitoringPart({ label, percentage }: Props) {
    const text =
        percentage === undefined ? "로딩 중..." : `${Math.ceil(percentage)}%`;
    return (
        <Card>
            <Card.Header>{fixCase(label)}</Card.Header>
            <Card.Body>
                <ProgressBar className="mb-2" now={percentage} animated />
                <Card.Text className="text-end">{text}</Card.Text>
            </Card.Body>
        </Card>
    );
}

function fixCase(x: string): string {
    return x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase();
}
