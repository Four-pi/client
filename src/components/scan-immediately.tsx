import { Button, Card, Stack } from "react-bootstrap";
import { scanApi } from "../apis";

interface SubmittableProps {
    onSubmit?: () => any;
}

export function ImmediateScan({ onSubmit }: SubmittableProps) {
    const onSubmitHandler = () => {
        scanApi.scan().then(onSubmit);
    };

    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal">
                    <div>Nmap 스캔</div>
                    <Button className="ms-auto" onClick={onSubmitHandler}>
                        이 버튼을 눌러 즉시 스캔 시작
                    </Button>
                </Stack>
            </Card.Header>
            <Card.Body>
                <Card.Text>지금 즉시 Nmap 스캔을 실시합니다.</Card.Text>
            </Card.Body>
        </Card>
    );
}
