import { Col, Container, Row } from "react-bootstrap";
import { UserList } from "../../components/user-list";
import { UserAdd } from "../../components/user-add";

export function UserListPage() {
    return (
        <Container>
            <Row className="my-3">
                <Col>
                    <h2>사용자 관리/계정 목록 보기</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <UserList />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <UserAdd />
                </Col>
            </Row>
        </Container>
    );
}
