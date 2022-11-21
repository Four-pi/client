import type { Port, Request, ScanTarget } from "../models/base";
import { sleep } from "../utils";
import * as api from "./base";
import * as data from "./mock-data";

export class ReportAPI implements api.ReportAPI {
    async getReport(id: string) {
        return {
            id,
            ip: 'localhost',
            subnet_mask: '24',
            created_at: "2022-11-02",
            ip_reports: [],
        };
    }

    async listReports() {
        await sleep(1000);
        return data.mockReports;
    }
}

export function includesPort(portList: Port[], port: Port): boolean {
    return portList.find((p) => p.ip === port.ip && p.port === port.port) !== undefined;
}

export class RequestAPI implements api.RequestAPI {
    async createRequest(ip: string, port: string, usage: string) {
    }

    async getRequest(id: string): Promise<Request> {
        return {
            id,
            created_by: {
                id: 'test-user',
                name: "김보민",
                department: "모바일사업부",
                created_at: "2008-01-14T04:33:35Z",
            },
            created_at: "",
            ip: "",
            port: "",
            usage: "",
        }
    }

    async listRequests() {
        return data.mockRequests;
    }

    async approveRequest(id: string) {
        return false;
    }

    async rejectRequest(id: string) {
        return false;
    }
}

export class ScanAPI implements api.ScanAPI {
    private list: ScanTarget[] = data.mockScanTargets;

    constructor() {
        this.scan = this.scan.bind(this);
        this.listScanTargets = this.listScanTargets.bind(this);
        this.addScanTarget = this.addScanTarget.bind(this);
        this.removeScanTarget = this.removeScanTarget.bind(this);
    }

    async scan() {
        debugger; // 스캔 잘 되고 있나 체크
        return {
            id: '1',
            ip: 'localhost',
            subnet_mask: '24',
            created_at: "2022-11-02",
            ip_reports: [],
        };
    }

    async listScanTargets() {
        return this.list;
    }

    async addScanTarget(ip: string, subnetMask: string | number | undefined): Promise<ScanTarget> {
        const scanTarget: ScanTarget = {
            ip,
            subnet_mask: subnetMask ? subnetMask.toString() : undefined,
        };
        this.list.push(scanTarget);
        return scanTarget;
    }

    async removeScanTarget(scanTarget: ScanTarget) {
        this.list = this.list.filter(oldTarget => !this.isEqualScanTarget(oldTarget, scanTarget));
        return scanTarget;
    }

    private isEqualScanTarget(target: ScanTarget, anotherTarget: ScanTarget): boolean {
        return target.ip === anotherTarget.ip && target.subnet_mask === anotherTarget.subnet_mask;
    }
}

export class MachineStatusAPI implements api.MachineStatusAPI {
    async monitor() {
        await sleep(300);
        return {
            cpu: Math.random() / 10 + 0.3,
            disk: Math.random() / 50 + 0.2,
            memory: Math.random() / 10 + 0.8,
            network: Math.random() * Math.random() * Math.random(),
        };
    }
}