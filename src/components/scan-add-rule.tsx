import { Card } from "react-bootstrap";
import { scanApi } from "../apis";
import { AddressForm, AddressFormData } from "./address-form";

interface SubmittableProps {
    onSubmit: () => any;
}

export function AddScanRule({ onSubmit }: SubmittableProps) {
    const onSubmitHandler = ({ ip, subnetMask }: AddressFormData) => {
        scanApi.addScanTarget(ip, subnetMask).then(onSubmit);
    };

    return (
        <Card>
            <Card.Header>스캔 규칙 추가</Card.Header>
            <Card.Body>
                <Card.Text>
                    스캔할 주소를 이곳에서 생성 할 수 있습니다. (IP 주소 / 서브넷 마스크)
                </Card.Text>
                <AddressForm askSubnetMask onSubmit={onSubmitHandler} />
            </Card.Body>
        </Card>
    );
}
