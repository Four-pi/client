import { Pagination } from "react-bootstrap";
import { listReport } from "../models/address-status";
import { Report } from "../models/base";

interface ReportPaginationProps {
    selectedReport: Report;
    onSelect: (report: Report) => any;
}

export function ReportListPagination({ selectedReport, onSelect }: ReportPaginationProps) {
    function onSelectHandlerGenerator(report: Report) {
        return () => onSelect(report);
    }

    return (
        <Pagination>
            {listReport().map((report, index) => (
                <Pagination.Item
                    key={index}
                    active={report.id === selectedReport?.id}
                    onClick={onSelectHandlerGenerator(report)}
                >
                    {new Date(report.created_at).toLocaleString()}
                </Pagination.Item>
            ))}
        </Pagination>
    );
}