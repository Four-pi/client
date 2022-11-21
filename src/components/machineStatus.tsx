import { Card, ProgressBar } from "react-bootstrap";
import type { MachineStatus } from "../models/base";

export function MachineStatusCard(props: { status: MachineStatus }) {
    return (
        <>
            {Object.entries(props.status).map(([key, value], index) => {
                let label: string =
                    key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase();
                let text: string = "로딩 중...";
                let percentage = 100;
                if (value !== undefined) {
                    percentage = Math.ceil(value * 100);
                    text = `${percentage}%`;
                }
                return (
                    <Card style={{ width: "100%" }} key={index}>
                        <Card.Header>{label}</Card.Header>
                        <Card.Body>
                            <ProgressBar
                                className="mb-2"
                                now={percentage}
                                animated
                            />
                            <Card.Text className="text-end">{text}</Card.Text>
                        </Card.Body>
                    </Card>
                );
            })}
        </>
    );
}
