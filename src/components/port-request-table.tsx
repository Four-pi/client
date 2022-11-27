import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { api } from "../apis";
import { Request } from "../models/base";
import { DisplayAddress } from "./address";

function _RequestTable(props: any) {
    return (
        <Table className="border" striped="columns" {...props}>
            <thead>
                <tr>
                    <th>포트 정보</th>
                    <th>사용 목적</th>
                    <th>요청 작성자</th>
                    <th>요청 생성일</th>
                    <th>리뷰어</th>
                    <th>리뷰된 날짜</th>
                    <th>처리 상태</th>
                </tr>
            </thead>
            <tbody>{props.children}</tbody>
        </Table>
    );
}

function _PendingRequestTableRow(props: any & { request: Request }) {
    const [request, setRequest] = useState<Request>(props.request);
    const [approvedState, setApprovedState] = useState<undefined | boolean>(
        undefined
    );

    if (request === undefined) return null;

    const onApproveHandler = () => {
        setApprovedState(true);
        api.port.request
            .approve(request.id)
            .then((updatedRequest) => setRequest(updatedRequest ?? request));
    };
    const onRejectHandler = () => {
        setApprovedState(false);
        api.port.request
            .reject(request.id)
            .then((updatedRequest) => setRequest(updatedRequest ?? request));
    };

    return (
        <tr {...props}>
            <td>
                <DisplayAddress ip={request.ip} port={request.port} />
            </td>
            <td>{request.usage ?? ""}</td>
            <td>{request.created_by?.name}</td>
            <td>{new Date(request.created_at).toLocaleString()}</td>
            <td colSpan={2}>아직 처리되지 않음</td>
            <td>
                {approvedState === undefined ? (
                    <>
                        <Button
                            className="py-1 me-2"
                            variant="primary"
                            onClick={onApproveHandler}
                        >
                            승낙
                        </Button>
                        <Button
                            className="py-1"
                            variant="danger"
                            onClick={onRejectHandler}
                        >
                            거부
                        </Button>
                    </>
                ) : approvedState ? (
                    "승낙 처리 중..."
                ) : (
                    "거부 처리 중..."
                )}
            </td>
        </tr>
    );
}

function _ReviewedRequestTableRow(props: any & { request: Request }) {
    const { request } = props;
    return (
        <tr {...props}>
            <td>
                <DisplayAddress ip={request.ip} port={request.port} />
            </td>
            <td>{request.usage ?? ""}</td>
            <td>{request.created_by?.name}</td>
            <td>{new Date(request.created_at).toLocaleString()}</td>
            <td>{request.reviewed_by?.name}</td>
            <td>{new Date(request.reviewed_at).toLocaleString()}</td>
            <td>{request.is_approved ? "승인됨" : "거부됨"}</td>
        </tr>
    );
}

export const RequestTable = Object.assign(_RequestTable, {
    PendingItem: _PendingRequestTableRow,
    ReviewedItem: _ReviewedRequestTableRow,
});
