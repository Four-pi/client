import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AddressForm } from "../../components/address-form";
import { OpenNewPort } from "../../components/port-open-new";
import { PortTogglePanel } from "../../components/port-toggle-panel";

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
                    <PortTogglePanel />
                </Col>
            </Row>
        </Container>
    );
}
