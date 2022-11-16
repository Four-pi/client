import { useEffect, useState } from "react";
import {
    Button,
    Container,
    Form,
    Modal,
    Nav,
    Navbar,
    NavbarBrand,
} from "react-bootstrap";
import { LoginController } from "./controllers/login";
import type { RouteItem } from "./router";
import { Router } from "./router";
import { LoginModal } from "./components/login";

export function Header() {
    const [updateSignal, setUpdateSignal] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleCloseLoginModal = () => setShowLoginModal(false);

    useEffect(() => {
        LoginController.instance.onDidLoginStateChange(() =>
            setUpdateSignal(!updateSignal)
        );
    });

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container fluid>
                    <NavbarBrand href="/">Four Pi</NavbarBrand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse>
                        <Nav navbarScroll>
                            <NavigationItems />
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <UserInfo />
                            <LoginToggleButton onLogin={handleShowLoginModal} onLogout={debugLogout} />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <LoginModal show={showLoginModal} onHide={handleCloseLoginModal} />
        </>
    );
}

function NavigationItems() {
    const children = Router.routes
        .filter(r => !r.adminOnly || LoginController.instance.isLoggedInAsAdmin())
        .map(createNavItem);
    return (
        <>
            {children}
        </>
    );
}

function createNavItem(routeItem: RouteItem, index: number) {
    return (
        <Nav.Item key={index}>
            <Nav.Link className="App-header-nav-item" href={routeItem.path}>
                {routeItem.label}
            </Nav.Link>
        </Nav.Item>
    );
}

function UserInfo() {
    if (!LoginController.instance.isLoggedIn()) return null;

    const { name, id } = LoginController.instance.user!;
    return (
        <Nav.Item style={{ color: "white" }}>
            <Nav.Link active>
                Signed in as {name} ({id})
            </Nav.Link>
        </Nav.Item>
    );
}

function LoginToggleButton({onLogin, onLogout }: { [key: string]: undefined | (() => any)}) {
    const state = {
        loggedIn: { text: "로그아웃", onclick: onLogout },
        loggedOut: { text: "로그인", onclick: onLogin },
    };
    const currentState = LoginController.instance.isLoggedIn()
        ? state.loggedIn
        : state.loggedOut;
    return (
        <Nav.Item onClick={currentState.onclick}>
            <Nav.Link>{currentState.text}</Nav.Link>
        </Nav.Item>
    );
}

// TODO: 제대로 된 로그인 구현하기.
function debugLogin() {
    LoginController.instance.login("admin", "password");
}

// TODO: 제대로 된 로그인 구현하기.
function debugLogout() {
    LoginController.instance.logout();
}
