import { Card, Form, Stack } from "react-bootstrap";
import { disableDemo, enableDemo, isDemoEnabled } from "../apis";
import { resetMockUps } from "../apis/mock";

function shouldDemoBeEnabled(): boolean {
    return Boolean(window.sessionStorage.getItem("use-demo"));
}

function toggle() {
    if (shouldDemoBeEnabled()) {
        window.sessionStorage.removeItem("use-demo");
    } else {
        window.sessionStorage.setItem("use-demo", "TRUE");
    }
    apply();
    window.location.reload();
}

function apply() {
    if (shouldDemoBeEnabled()) {
        disableDemo();
    } else {
        enableDemo();
    }
}

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
                            onClick={toggle}
                        />
                    </div>
                </Stack>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {isDemoEnabled() ? (
                        <Stack direction="horizontal">
                            <div>헌재 목업 데이터 사용 중</div>
                            <div className="ms-auto">
                                <a href="#" onClick={() => resetMockUps()}>
                                    목업 데이터 초기화
                                </a>
                            </div>
                        </Stack>
                    ) : (
                        "헌재 서버로 부터 데이터 수신 중"
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

apply();
