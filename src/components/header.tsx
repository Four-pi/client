import { useState } from "react";
import {
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavDropdown,
} from "react-bootstrap";
import { LoginModal } from "./header-login-modal";
import { UserInfo } from "./header-user-info";
import { LoginToggleButton } from "./header-login-toggle";
import { logout } from "../models/login";
import { RequireLogin } from "../components/require-login";

export function Header() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleCloseLoginModal = () => setShowLoginModal(false);

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid>
                <NavbarBrand href="/">Four Pi</NavbarBrand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse>
                    <Nav navbarScroll>
                        <Nav.Link href="/">대시보드</Nav.Link>
                        <RequireLogin>
                            <NavDropdown title="보안 스캔">
                                <NavDropdown.Item href="/scan/log">
                                    스캔 기록 보기
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/scan/settings">
                                    스캔 설정
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="포트 관리">
                                <NavDropdown.Item href="/port/list">
                                    포트 목록 보기
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/port/settings">
                                    포트 설정
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="포트 사용 요청">
                                <NavDropdown.Item href="/port/request/create">
                                    포트 사용 요청 생성
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/port/request/reviewed">
                                    처리된 요청 보기
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/port/request/pending">
                                    처리 대기중인 요청 보기
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="사용자 관리">
                                <NavDropdown.Item href="/user/list">
                                    계정 목록 보기
                                </NavDropdown.Item>
                            </NavDropdown>
                        </RequireLogin>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <UserInfo />
                        <LoginToggleButton
                            onLogin={handleShowLoginModal}
                            onLogout={logout}
                        />
                        <LoginModal
                            show={showLoginModal}
                            onHide={handleCloseLoginModal}
                        />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
