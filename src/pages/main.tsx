import { Col, Container, Row, Stack } from "react-bootstrap";
import {
    MachineStatusWidget,
    RecentlyOpenedAddressWidget,
    IPChangeHistoryWidget,
} from "../components/widgets";
import { ActiveHosts } from "../components/active-hosts";

export function MainPage() {
    return (

        <Container className="mt-3" fluid>
            <Row>
                <Col xs={6}>
                    <Stack gap={3}>
                        <ActiveHosts />
                        <IPChangeHistoryWidget />
                    </Stack>
                </Col>
                <Col xs={6}>
                    <RecentlyOpenedAddressWidget />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <MachineStatusWidget />
                </Col>
            </Row>
        </Container>
    )
}