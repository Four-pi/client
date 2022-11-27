import { ListGroup, Stack } from "react-bootstrap";
import { ensureFindAddress } from "../models/core";
import { PortReport, Report } from "../models/base";
import { DisplayAddress } from "./address";
import { ConditionalComponent } from "./conditional-component";
import { PortStatusBadge } from "./port-status-badge";

export function ReportList({ report }: { report: Report }) {
    return (
        <ListGroup>
            {report.reports.map((portReport, index) => (
                <ListGroup.Item key={index}>
                    <Stack direction="horizontal" gap={3}>
                        <div>
                            <DisplayAddress
                                ip={portReport.ip}
                                port={portReport.port}
                            />
                        </div>
                        <div>
                            <ReportDetail report={portReport} />
                        </div>
                        <div className="ms-auto">
                            <PortStatusBadge
                                isAuthenticated={
                                    ensureFindAddress(
                                        portReport.ip,
                                        portReport.port
                                    ).isAuthorized
                                }

                                isOnline={
                                    ensureFindAddress(
                                        portReport.ip,
                                        portReport.port
                                    ).isOnline
                                }
                            />
                        </div>
                    </Stack>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

function ReportDetail(props: any & { report: PortReport }) {
    return (
        <div>
            <Stack direction="horizontal" gap={3}>
                <ConditionalComponent when={props.report.protocol}>
                    <Description label="protocol" value={props.report.protocol} />
                </ConditionalComponent>
                <ConditionalComponent when={props.report.service}>
                    <Description label="service" value={props.report.service} />
                </ConditionalComponent>
            </Stack>
            <ConditionalComponent when={props.report.version}>
                <Description label="version" value={props.report.version} />
            </ConditionalComponent>
        </div>
    );
}

function Description(props: any & { label: string; value: string }) {
    return (
        <div {...props}>
            <span style={{ opacity: 0.3 }}>{props.label}: </span>
            <span style={{ opacity: 0.5 }}>{props.value}</span>
        </div>
    );
}
