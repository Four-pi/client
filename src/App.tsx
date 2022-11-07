import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";

interface NavItem {
    path: string;
    label: string;
    element?: JSX.Element;
}
const routes: NavItem[] = [
    { path: "/", element: <IndexPage />, label: "메인" },
];

const router = createBrowserRouter(routes);

interface User {
    id: string;
    name: string;
}

const user: User | null = null;

function isLoggedIn(): boolean {
    return user !== null;
}

function App() {
    return (
        <div className="App">
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container fluid>
                    <NavbarBrand href="/">Four Pi</NavbarBrand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse>
                        <Nav navbarScroll>{routes.map(createNavItem)}</Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {isLoggedIn() ? (
                                <Nav.Item>
                                    Signed in as {user!.name} ({user!.id})
                                </Nav.Item>
                            ) : null}
                            <Nav.Item>
                                {isLoggedIn() ? (
                                    <Nav.Link href="#logout">로그아웃</Nav.Link>
                                ) : (
                                    <Nav.Link href="#login">로그인</Nav.Link>
                                )}
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <RouterProvider router={router} />
        </div>
    );
}

function createNavItem(navItem: NavItem) {
    return (
        <Nav.Item>
            <Nav.Link className="App-header-nav-item" href={navItem.path}>
                {navItem.label}
            </Nav.Link>
        </Nav.Item>
    );
}

export default App;
