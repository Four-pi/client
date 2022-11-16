import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { LoginController } from "../controllers/login";

interface LoginModalProps {
    show: boolean;
    onHide: (...args: any[]) => any;
}

export class LoginModal extends React.Component<LoginModalProps> {
    onLogin() {
        LoginController.instance.login("admin", "password");
    }

    onSignUp() {

    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder="아이디를 입력하세요" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.onLogin}>로그인</Button>
                    <Button variant="secondary" onClick={this.onSignUp}>회원가입</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}