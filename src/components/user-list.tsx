import { useEffect, useState } from "react";
import { Button, Card, Stack, Table } from "react-bootstrap";
import { api } from "../apis";
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
                <Table striped="columns" className="border">
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>부서</th>
                            <th>아이디</th>
                            <th>가입일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                {renderUser(user)}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

function renderUser(user: User) {
    return (
        <>
            <td>{user.name}</td>
            <td>{user.department}</td>
            <td>{user.id}</td>
            <td>{new Date(user.created_at).toLocaleString()}</td>
        </>
    );
}
