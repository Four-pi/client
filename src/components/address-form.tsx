import { Button, Form, InputGroup } from "react-bootstrap";

interface AddressFormProps {
    askPort?: boolean;
    askSubnetMask?: boolean;
    onSubmit?: (address: AddressFormData) => any;
}

export interface AddressFormData {
    ip: string,
    port?: string,
    subnetMask?: string,
}

export function AddressForm({ askPort, askSubnetMask, onSubmit }: AddressFormProps) {
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
            subnet_mask: HTMLInputElement;
        };
        const ip = [
            target.ip_part_1.value,
            target.ip_part_2.value,
            target.ip_part_3.value,
            target.ip_part_4.value,
        ]
            .map((v) => parseInt(v).toString())
            .join(".");
        const address: AddressFormData = {
            ip,
            port: target.port?.value,
            subnetMask: target.subnet_mask?.value,
        };
        onSubmit?.(address);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
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
                    {askPort ? (
                        <>
                            <InputGroup.Text>:</InputGroup.Text>
                            <Form.Control
                                name="port"
                                type="number"
                                placeholder=""
                                min={0}
                                max={99999}
                            />
                        </>
                    ) : null}
                    {askSubnetMask ? (
                        <>
                            <InputGroup.Text>/</InputGroup.Text>
                            <Form.Control
                                name="subnet_mask"
                                type="number"
                                placeholder=""
                                min={0}
                                max={255}
                            />
                        </>
                    ) : null}
                    <Button type="submit">제출</Button>
                </InputGroup>
            </Form.Group>
        </Form>
    );
}
