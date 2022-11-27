import { Table } from "react-bootstrap";
import { User } from "../models/base";

function _UserTable(props: any) {
    return (
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
                {props.children}
            </tbody>
        </Table>
    );
}

function _UserTableItem(props: any & { user: User }) {
    const { user } = props;
    return (
        <tr {...props}>
            <td>{user.name}</td>
            <td>{user.department}</td>
            <td>{user.id}</td>
            <td>{new Date(user.created_at).toLocaleString()}</td>
        </tr>
    );
}

export const UserTable = Object.assign(_UserTable, {
    Item: _UserTableItem,
});
