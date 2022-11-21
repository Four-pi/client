import { Nav } from "react-bootstrap";
import { userApi } from "../apis";

export function UserInfo() {
    if (!userApi.isLoggedIn())
        return null;

    const user = userApi.getCurrentUser()!;

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
