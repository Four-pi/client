import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ScanAddressList } from "../../components/scan-address-list";
import { AddScanRule } from "../../components/scan-add-rule";
import { ImmediateScan } from "../../components/scan-immediately";

export function ScanSettingsPage() {
    const [updateSignal, setUpdateSignal] = useState(false);

    function update() {
        setUpdateSignal(!updateSignal);
    }

    return (
        <Container>
            <Row className="p-3">
                <Col>
                    <h2>스캔 설정</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <ImmediateScan onSubmit={update} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <AddScanRule onSubmit={update} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <ScanAddressList />
                </Col>
            </Row>
        </Container>
    );
}
