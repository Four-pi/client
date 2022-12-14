import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { OpenNewPort } from "../widgets/port-open-new";
import { PortTogglePannel } from "../widgets/port-toggle-pannel";

export function PortSettingsPage() {
    const [updateSignal, setUpdateSignal] = useState(false);

    function update() {
        setUpdateSignal(!updateSignal);
    }

    return (
        <Container>
            <Row className="p-3">
                <Col>
                    <h2>포트 관리/포트 설정</h2>
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <OpenNewPort onSubmit={update} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <PortTogglePannel />
                </Col>
            </Row>
        </Container>
    );
}
