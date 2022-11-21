import { Button, Form, InputGroup, Stack } from "react-bootstrap";

interface PortRequestFormProps {
    onSubmit?: (portRequest: PortRequestFormData) => any;
}

export interface PortRequestFormData {
    ip: string;
    port: string;
    usage: string;
}

export function PortRequestForm({ onSubmit }: PortRequestFormProps) {
    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
        event
    ) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            ip_part_1: HTMLInputElement;
            ip_part_2: HTMLInputElement;
            ip_part_3: HTMLInputElement;
            ip_part_4: HTMLInputElement;
            port: HTMLInputElement;
            usage: HTMLInputElement;
        };
        const ip = [
            target.ip_part_1.value,
            target.ip_part_2.value,
            target.ip_part_3.value,
            target.ip_part_4.value,
        ]
            .map((v) => parseInt(v).toString())
            .join(".");
        const portRequest: PortRequestFormData = {
            ip,
            port: target.port.value,
            usage: target.usage.value,
        };
        onSubmit?.(portRequest);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Text>Ip, port 주소</Form.Text>
            <Form.Group className="mb-3">
                <InputGroup>
                    <Form.Control
                        name="ip_part_1"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={255}
                        required
                    />
                    <InputGroup.Text>.</InputGroup.Text>
                    <Form.Control
                        name="ip_part_2"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={255}
                        required
                    />
                    <InputGroup.Text>.</InputGroup.Text>
                    <Form.Control
                        name="ip_part_3"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={255}
                        required
                    />
                    <InputGroup.Text>.</InputGroup.Text>
                    <Form.Control
                        name="ip_part_4"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={255}
                        required
                    />
                    <InputGroup.Text>:</InputGroup.Text>
                    <Form.Control
                        name="port"
                        type="number"
                        placeholder=""
                        min={0}
                        max={99999}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Text>사용목적</Form.Text>
            <Form.Group className="mb-3">
                <Form.Control name="usage" as="textarea" required />
            </Form.Group>

            <Stack direction="horizontal">
                <Button type="submit" className="ms-auto">
                    제출
                </Button>
            </Stack>
        </Form>
    );
}
