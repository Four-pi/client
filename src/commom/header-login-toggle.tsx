import { Nav } from "react-bootstrap";
import { userApi } from "../apis";

interface LoginToggleButtonProps {
    onLogin?: () => any;
    onLogout?: () => any;
}

export function LoginToggleButton({
    onLogin,
    onLogout,
}: LoginToggleButtonProps) {
    return userApi.isLoggedIn() ? (
        <Nav.Item onClick={onLogout}>
            <Nav.Link>로그아웃</Nav.Link>
        </Nav.Item>
    ) : (
        <Nav.Item onClick={onLogin}>
            <Nav.Link>로그인</Nav.Link>
        </Nav.Item>
    );
}
