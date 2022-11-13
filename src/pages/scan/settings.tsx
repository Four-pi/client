import React from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    ListGroup,
    Row,
} from "react-bootstrap";

interface NmapScanRule {
    host: string;
    subnetMask?: number;
}

export class Settings extends React.Component<
    any,
    { targets: NmapScanRule[] }
> {
    constructor() {
        super({});
        this.state = {
            targets: [
                {
                    host: "127.0.0.1",
                    subnetMask: 24,
                },
                {
                    host: "8.8.8.8",
                },
            ],
        };
    }

    addScanRule(rule: NmapScanRule) {}

    render() {
        return (
            <Container fluid>
                <Row className="p-3">
                    <h2>스캔 설정</h2>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Card>
                            <Card.Header>스캔 규칙 추가</Card.Header>
                            <Card.Body>
                                <Form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }}
                                >
                                    <Form.Group>
                                        <Form.Label>
                                            IP 주소 / 서브넷마스크
                                        </Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                min={0}
                                                max={255}
                                                required
                                            />
                                            <InputGroup.Text>.</InputGroup.Text>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                min={0}
                                                max={255}
                                                required
                                            />
                                            <InputGroup.Text>.</InputGroup.Text>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                min={0}
                                                max={255}
                                                required
                                            />
                                            <InputGroup.Text>.</InputGroup.Text>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                min={0}
                                                max={255}
                                                required
                                            />
                                            <InputGroup.Text>/</InputGroup.Text>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                min={0}
                                                max={255}
                                            />
                                            <Button type="submit">
                                                규칙 추가
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Card>
                            <Card.Header>스캔 규칙</Card.Header>
                            <Card.Body>
                                <Card.Text>스캔할 ip주소 목룍</Card.Text>
                                <ListGroup>
                                    {this.state.targets.map((t) => (
                                        <ListGroup.Item>
                                            {t.host}
                                            <span style={{ color: "gray" }}>
                                                {t.subnetMask
                                                    ? `/${t.subnetMask}`
                                                    : null}
                                            </span>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
