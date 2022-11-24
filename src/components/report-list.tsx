import { ListGroup, Stack } from "react-bootstrap";
import { ensureFindAddress } from "../models/core";
import { Report } from "../models/base";
import { DisplayAddress } from "./address";
import { PortStatusBadge } from "./port-status-badge";

export function ReportList({ report }: { report: Report }) {
    return (
        <ListGroup>
            {report.reports.map((portReport, index) => (
                <ListGroup.Item key={index}>
                <Stack direction="horizontal" gap={3}>
                    <div>
                        <DisplayAddress ip={portReport.ip} port={portReport.port} />
                    </div>
                    {portReport.service ? (
                        <div>
                            <span style={{ color: "lightgray" }}>service: </span>
                            <span style={{ color: "gray" }}>{portReport.service}</span>
                        </div>
                    ) : null}
                    <div className="ms-auto">
                        <PortStatusBadge
                            isAuthenticated={ensureFindAddress(portReport.ip, portReport.port).isAuthorized}
                        />
                    </div>
                </Stack>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
