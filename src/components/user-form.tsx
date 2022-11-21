import { Button, Form, InputGroup, Stack } from "react-bootstrap";

interface UserFormProps {
    askMail?: boolean;
    requireMail?: boolean;
    onSubmit?: (userFormData: UserFormData) => any;
}

export interface UserFormData {
    id: string,
    password: string,
    name: string,
    department: string,
    mail?: string | undefined,
}

export function UserForm({ askMail, requireMail, onSubmit }: UserFormProps) {
    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
        event
    ) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            id: HTMLInputElement;
            password: HTMLInputElement;
            name: HTMLInputElement;
            department: HTMLInputElement;
            mail: HTMLInputElement;
        };
        const userFormData: UserFormData = {
            id: target.id.value,
            password: target.password.value,
            name: target.name.value,
            department: target.department.value,
            mail: target.mail.value,
        };
        onSubmit?.(userFormData);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <Form.Text>로그인 정보</Form.Text>
                <InputGroup className="mb-3">
                    <Form.Control
                        name="id"
                        type="text"
                        placeholder="아이디"
                        required
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        required
                    />
                </InputGroup>
                <Form.Text>인적 정보</Form.Text>
                <InputGroup className="mb-3">
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="이름"
                        required
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control
                        name="department"
                        type="text"
                        placeholder="부서"
                        required
                    />
                </InputGroup>
                {askMail ? (
                    <InputGroup className="mb-3">
                        <Form.Control
                            name="mail"
                            type="email"
                            placeholder="이메일"
                            required={requireMail}
                        />
                    </InputGroup>
                ) : null}
                <Stack direction="horizontal">
                    <Button type="submit" className="ms-auto px-3">
                        제출
                    </Button>
                </Stack>
            </Form.Group>
        </Form>
    );
}
