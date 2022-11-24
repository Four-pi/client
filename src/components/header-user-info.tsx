import { Nav } from "react-bootstrap";
import { getCurrentUser, isLoggedIn } from "../models/login";

export function UserInfo() {
    if (!isLoggedIn())
        return null;
    const user = getCurrentUser();
    return (
        <Nav.Item style={{ color: "white" }}>
            <Nav.Link active>
                <span style={{ color: "white" }}>
                    Signed in as {user.name} ({user.id})
                </span>
            </Nav.Link>
        </Nav.Item>
    );
}
