import { Card } from "react-bootstrap";
import { api } from "../apis";
import { AddressForm, AddressFormData } from "../components/address-form";

interface SubmittableProps {
    onSubmit?: () => any;
}

export function OpenNewPort({ onSubmit }: SubmittableProps) {
    const onSubmitHandler = ({ ip, port }: AddressFormData) => {
        api.port.open(ip, port!).then(onSubmit);
    };

    return (
        <Card>
            <Card.Header>새 포트 열기</Card.Header>
            <Card.Body>
                <AddressForm askPort onSubmit={onSubmitHandler} />
            </Card.Body>
            <Card.Footer>
                새로 열 포트의 ip주소와 port를 입력하세요.
            </Card.Footer>
        </Card>
    );
}
