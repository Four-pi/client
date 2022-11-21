import type { Report, Request } from "../models/base";

export interface SimplifiedReport {
    ip: string;
    port: string;
    service: string;
    isOnline: boolean;
    isAuthenticated: boolean;
}

export class SimplifiedReportRepositoryRecord {
    private ip: string;
    private port: string;
    private isAuthenticated: boolean;
    private data: {
        [key: string]: {
            service: string;
            isOnline: boolean;
        };
    } = {};

    constructor(ip: string, port: string, isAuthenticated: boolean = false) {
        this.ip = ip;
        this.port = port;
        this.isAuthenticated = isAuthenticated;
    }

    authenticate() {
        this.isAuthenticated = true;
    }

    add(reportId: string, service: string, isOnline: boolean) {
        this.data[reportId] = {
            service,
            isOnline,
        };
    }

    get(reportId: string): SimplifiedReport {
        if (!(reportId in this.data)) {
            this.add(reportId, "", false);
        }
        return {
            ...this.data[reportId],
            ip: this.ip,
            port: this.port,
            isAuthenticated: this.isAuthenticated,
        };
    }
}

export class SimplifiedReportRepository {
    private rows: { [address: string]: SimplifiedReportRepositoryRecord } = {};

    constructor(reports: Report[], requests: Request[]) {
        this.parseReports(reports);
        this.applyApprovedRequests(requests);
    }

    private parseReports(reports: Report[]) {
        for (const report of reports) {
            for (const ipReport of report.ip_reports) {
                for (const portReport of ipReport.port_reports) {
                    this.getByAddress(ipReport.ip, portReport.port).add(
                        report.id,
                        portReport.service,
                        true
                    );
                }
            }
        }
    }

    private applyApprovedRequests(requests: Request[]) {
        for (const request of requests) {
            const record = this.getByAddress(request.ip, request.port);
            if (request.is_approved) {
                record.authenticate();
            }
        }
    }

    getByAddress(ip: string, port: string): SimplifiedReportRepositoryRecord {
        const address = this.createAddress(ip, port);
        if (!(address in this.rows)) {
            this.rows[address] = new SimplifiedReportRepositoryRecord(ip, port);
        }
        return this.rows[address];
    }

    getByReport(reportId: string): SimplifiedReport[] {
        return Object.values(this.rows).map((row) => row.get(reportId));
    }

    private createAddress(ip: string, port: string): string {
        return `${ip}:${port}`;
    }
}
