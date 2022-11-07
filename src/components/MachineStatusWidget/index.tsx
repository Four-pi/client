import { Card, ProgressBar, Stack } from "react-bootstrap";
import "./style.css";

interface UsageStatus {
    label: string;
    percentage: number;
}
const machineStatus: UsageStatus[] = [
    { label: "CPU", percentage: 60 },
    { label: "Disk", percentage: 33 },
    { label: "Memory", percentage: 100 },
    { label: "Network", percentage: 8 },
];

export default function MachineStatusWidget() {
    return (
        <Card>
            <Card.Header>
                장치 부하 상태
            </Card.Header>
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    {machineStatus.map(status =>
                        <div className="MachineStatus-item">
                            {createUsageStatusItem(status)}
                        </div>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    );
}

function createUsageStatusItem(status: UsageStatus) {
    return (
        <Card>
            <Card.Header>{status.label}</Card.Header>
            <Card.Body>
                <Card.Text className="text-end">
                    <ProgressBar now={status.percentage} />
                    {status.percentage}%
                </Card.Text>
            </Card.Body>
        </Card>
    );
}