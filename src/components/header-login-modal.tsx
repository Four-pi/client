import React from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { login } from "../models/core";

interface LoginModalProps {
    show: boolean;
    onHide: (...args: any[]) => any;
}

export function LoginModal({ show, onHide }: LoginModalProps) {
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const { userId, userPw } = event.target as typeof event.target & {
            userId: HTMLInputElement;
            userPw: HTMLInputElement;
        };
        login(userId.value, userPw.value);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>로그인</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            name="userId"
                            type="text"
                            placeholder="아이디를 입력하세요"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            name="userPw"
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Stack direction="horizontal">
                            <Button
                                type="submit"
                                variant="primary"
                                className="ms-auto"
                            >
                                로그인
                            </Button>
                        </Stack>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer></Modal.Footer>
        </Modal>
    );
}
