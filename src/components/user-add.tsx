import { Card } from "react-bootstrap";
import { api } from "../apis";
import { UserForm, UserFormData } from "./user-form";

export function UserAdd() {
    const onSubmitHandler = (userFormData: UserFormData) => {
        api.user.create(
                userFormData.id,
                userFormData.password,
                userFormData.name,
                userFormData.department,
                userFormData.mail
            )
            .then(() => {
                window.location.reload();
            });
    };

    return (
        <Card>
            <Card.Header>사용자 추가하기</Card.Header>
            <Card.Body>
                <UserForm askMail onSubmit={onSubmitHandler} />
            </Card.Body>
            <Card.Footer>
                *이 곳에서 추가되는 사용자는 관리자 권한을 획득합니다.
            </Card.Footer>
        </Card>
    );
}
