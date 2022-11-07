import { Badge, Card, ListGroup } from "react-bootstrap";

interface History {
    ipv4: string;
    lastmod: string;
    isSuccessful: boolean;
}
const histories: History[] = [
    {
        ipv4: "127.0.0.1",
        lastmod: new Date().toISOString(),
        isSuccessful: true,
    },
    {
        ipv4: "localhost",
        lastmod: new Date("2022-11-07").toISOString(),
        isSuccessful: false,
    },
];

export default function IPChangeHistoryWidget() {
    return (
        <Card>
            <Card.Header>최근 IP 변경 사항</Card.Header>
            <Card.Body>
                <ListGroup as="ul">
                    {histories.map(createHistoryItem)}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

function createHistoryItem(history: History) {
    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
            <div className="ms-2 me-auto">
                <div className="fw-bold">{history.ipv4}</div>
                {history.lastmod}
            </div>
            <Badge bg={history.isSuccessful ? 'success' : 'danger'} pill>
                {history.isSuccessful ? '성공' : '실패'}
            </Badge>
        </ListGroup.Item>
    );
}
