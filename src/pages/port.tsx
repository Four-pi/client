import React from "react";
import {
    Badge,
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    ListGroup,
    Row,
} from "react-bootstrap";

interface PendingPortOption {
    host: string;
    service: string;
    requestedDate: Date;
    comment?: string;
    expireDate?: Date;
    isPending: true;
}

interface ApprovedPortOption {
    host: string;
    service: string;
    requestedDate: Date;
    approvedDate: Date;
    comment?: string;
    expireDate?: Date;
    isPending: false;
    isAllowed: boolean;
}

function isPendingPortOption(option: PortOption): option is PendingPortOption {
    return option.isPending;
}

function isApprovedPortOption(
    option: PortOption
): option is ApprovedPortOption {
    return !option.isPending;
}

type PortOption = PendingPortOption | ApprovedPortOption;

export class Port extends React.Component<any, { portOptions: PortOption[] }> {
    constructor() {
        super({});
        this.state = {
            portOptions: [
                {
                    host: "127.0.0.1",
                    service: "ssh",
                    requestedDate: new Date(),
                    comment: "서버용",
                    isPending: true,
                },
                {
                    host: "192.168.0.1",
                    service: "메롱",
                    comment: "장난으로 보낸 요청이 거절된 케이스.",
                    requestedDate: new Date(),
                    approvedDate: new Date(),
                    isPending: false,
                    isAllowed: false,
                },
                {
                    host: "192.168.0.1",
                    service: "tcp",
                    requestedDate: new Date(),
                    approvedDate: new Date(),
                    isPending: false,
                    isAllowed: true,
                },
            ],
        };
    }

    render() {
        return (
            <Container>
                <Row className="p-3">
                    <h2>허용된 포트 관리</h2>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Card>
                            <Card.Header>포트 사용 요청</Card.Header>
                            <Card.Body>
                                <Form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }}
                                >
                                    <Form.Group className="mb-3">
                                        <Form.Label>IP 주소</Form.Label>
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
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>사용목적</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="사용 목적을 적어주세요. (예: ssh)"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>코멘트</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="부연 설명을 적어주세요"
                                        />
                                    </Form.Group>
                                    <Button type="submit">포트 사용 요청하기</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Card>
                            <Card.Header>처리 대기중인 요청 목록</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    {this.state.portOptions
                                        .filter(isPendingPortOption)
                                        .map(PendingPortOptionItem)}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Card>
                            <Card.Header>처리된 요청 목록</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    {this.state.portOptions
                                        .filter(isApprovedPortOption)
                                        .map(ApprovedPortOptionItem)}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function PendingPortOptionItem(option: PendingPortOption) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    <span style={{ color: "gray" }}>IP 주소: </span>
                    {option.host}
                </div>

                <div className="px-2">
                    <span style={{ color: "gray" }}>사용목적: </span>
                    {option.service}
                </div>
                {option.comment ? (
                    <div className="px-2">
                        <span style={{ color: "gray" }}>코멘트: </span>{" "}
                        {option.comment}
                    </div>
                ) : null}
            </div>
            <span>
                <Button variant="primary" className="mx-1">
                    수락
                </Button>
                <Button variant="danger" className="mx-1">
                    거절
                </Button>
            </span>
        </ListGroup.Item>
    );
}

function ApprovedPortOptionItem(option: ApprovedPortOption) {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    <span style={{ color: "gray" }}>IP 주소: </span>
                    {option.host}
                </div>

                <div className="px-2">
                    <span style={{ color: "gray" }}>사용목적: </span>
                    {option.service}
                </div>
                {option.comment ? (
                    <div className="px-2">
                        <span style={{ color: "gray" }}>코멘트: </span>{" "}
                        {option.comment}
                    </div>
                ) : null}
            </div>
            <span style={{ fontSize: "1.2em" }}>
                <Badge bg={option.isAllowed ? "success" : "danger"} pill>
                    {option.isAllowed ? "수락됨" : "거절됨"}
                </Badge>
            </span>
        </ListGroup.Item>
    );
}
