import React, { useEffect, useState } from "react";
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
import { ScanAPI, ScanMockAPI, ScanTarget } from "../../apis/scan";

const scanApi: ScanAPI = new ScanMockAPI();

export function ScanSettingsPage() {
    const [scanTargets, setScanTargets] = useState<ScanTarget[]>([]);

    function updateScanTargets() {
        scanApi
            .listScanTargets()
            .then((scanTargets) => setScanTargets(scanTargets.slice()));
    }

    useEffect(updateScanTargets, []);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            ip_part_1: HTMLInputElement;
            ip_part_2: HTMLInputElement;
            ip_part_3: HTMLInputElement;
            ip_part_4: HTMLInputElement;
            subnet_mask: HTMLInputElement;
        };
        const ip = [
            target.ip_part_1.value,
            target.ip_part_2.value,
            target.ip_part_3.value,
            target.ip_part_4.value,
        ]
            .map((v) => parseInt(v).toString())
            .join(".");
        const subnet_mask = target.subnet_mask.value;
        scanApi.addScanTarget({ ip, subnet_mask }).then(updateScanTargets);
    };

    return (
        <Container fluid>
            <Row className="p-3">
                <Col>
                    <h2>스캔 설정</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Button style={{ width: "100%" }} onClick={scanApi.scan}>
                        스캔하기
                    </Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Card>
                        <Card.Header>스캔 규칙 추가</Card.Header>
                        <Card.Body>
                            <ScanRuleForm onSubmit={onSubmit} />
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
                            <ScanRulesList scanTargets={scanTargets} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

function ScanRuleForm({
    onSubmit,
}: {
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
}) {
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>IP 주소 / 서브넷마스크</Form.Label>
                <InputGroup>
                    <Form.Control
                        name="ip_part_1"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={255}
                        required
                    />
                    <InputGroup.Text>.</InputGroup.Text>
                    <Form.Control
                        name="ip_part_2"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={255}
                        required
                    />
                    <InputGroup.Text>.</InputGroup.Text>
                    <Form.Control
                        name="ip_part_3"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={255}
                        required
                    />
                    <InputGroup.Text>.</InputGroup.Text>
                    <Form.Control
                        name="ip_part_4"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={255}
                        required
                    />
                    <InputGroup.Text>/</InputGroup.Text>
                    <Form.Control
                        name="subnet_mask"
                        type="number"
                        placeholder=""
                        min={0}
                        max={255}
                    />
                    <Button type="submit">규칙 추가</Button>
                </InputGroup>
            </Form.Group>
        </Form>
    );
}

function ScanRulesList({ scanTargets }: { scanTargets: ScanTarget[] }) {
    return (
        <ListGroup>
            {scanTargets.map((scanTarget, index) => (
                <ListGroup.Item key={index}>
                    {scanTarget.ip}
                    <span style={{ color: "gray" }}>
                        {scanTarget.subnet_mask
                            ? `/${scanTarget.subnet_mask}`
                            : null}
                    </span>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
