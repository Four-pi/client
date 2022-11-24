import { Nav } from "react-bootstrap";
import { isLoggedIn } from "../models/login";

interface Props {
    onLogin?: () => any;
    onLogout?: () => any;
}

export function LoginToggleButton({ onLogin, onLogout }: Props) {
    return isLoggedIn() ? (
        <Nav.Item onClick={onLogout}>
            <Nav.Link>로그아웃</Nav.Link>
        </Nav.Item>
    ) : (
        <Nav.Item onClick={onLogin}>
            <Nav.Link>로그인</Nav.Link>
        </Nav.Item>
    );
}
