import { Card } from "react-bootstrap";
import { requestApi } from "../apis";
import {
    PortRequestForm,
    PortRequestFormData,
} from "../components/port-request-form";
import { sitemap } from "../router";

export function PortRequestCreate() {
    const onSubmitHandler = ({ ip, port, usage }: PortRequestFormData) => {
        requestApi
            .createRequest(ip, port, usage)
            .then(
                () => (window.location.href = sitemap.port.request.pending.path)
            );
    };
    return (
        <Card>
            <Card.Header>요청 작성하기</Card.Header>
            <Card.Body>
                <PortRequestForm onSubmit={onSubmitHandler} />
            </Card.Body>
        </Card>
    );
}
