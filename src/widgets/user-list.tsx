import { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { api } from "../apis";
import { UserTable } from "../components/user-table";
import { User } from "../models/base";

export function UserList() {
    const [users, setUsers] = useState<User[]>([]);

    function updateUser() {
        api.user.list().then(setUsers);
    }

    useEffect(updateUser, []);

    return (
        <Card>
            <Card.Header>
                <Stack direction="horizontal">
                    <div>사용자 목록</div>
                    <Button className="ms-auto" onClick={updateUser}>
                        새로고침
                    </Button>
                </Stack>
            </Card.Header>
            <Card.Body>
                <UserTable>
                    {users.map((user, index) => (
                        <UserTable.Item key={index} user={user} />
                    ))}
                </UserTable>
            </Card.Body>
        </Card>
    );
}
