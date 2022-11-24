import { Card, Form, Stack } from "react-bootstrap";
import { isDemoEnabled, toggleDemo } from "../apis";

export function DemoSwitch() {
    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal">
                    <div>데모 활성/비활성화</div>
                    <div className="ms-auto">
                        <Form.Check
                            type="switch"
                            defaultChecked={isDemoEnabled()}
                            onClick={toggleDemo}
                        />
                    </div>
                </Stack>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {isDemoEnabled()
                        ? "헌재 목업 데이터 사용 중"
                        : "헌재 서버로 부터 데이터 수신 중"}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
