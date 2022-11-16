import { useEffect, useState } from "react";
import { ListGroup, Stack } from "react-bootstrap";
import { User, UserAPI, UserMockAPI } from "../../apis/user";

const userApi: UserAPI = new UserMockAPI();

export function UserListPage() {
    const [users, setUsers] = useState<User[]>([]);

    function updateUsers() {
        userApi.listUsers().then((users) => setUsers(users.slice()));
    }

    useEffect(updateUsers, []);

    return (
        <ListGroup>
            {users.map((user, index) => (
                <ListGroup.Item key={index}>
                    <Stack direction="horizontal" gap={3}>
                        <div>
                            {user.name}{" "}
                            <span style={{ color: "gray" }}>
                                @{user.department}
                            </span>
                        </div>
                        <div>({user.id})</div>
                    </Stack>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
