import type { Report } from "./report";

export interface ScanTarget {
    ip: string;
    subnet_mask?: string;
}

export interface ScanAPI {
    scan(): Promise<Report>; // 즉시 스캔
    listScanTargets(): Promise<ScanTarget[]>;
    addScanTarget(scanTarget: ScanTarget): Promise<ScanTarget>;
    removeScanTarget(scanTarget: ScanTarget): Promise<ScanTarget>;
}

export class ScanMockAPI implements ScanAPI {
    private list: ScanTarget[] = [
        {
            ip: "127.0.0.1",
            subnet_mask: "24",
        },
        {
            ip: "8.8.8.8",
        },
        {
            ip: "bobomin.co.kr",
        },
        {
            ip: "google.com",
        },
        {
            ip: "192.168.0.1",
            subnet_mask: "8"
        },
    ];

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

    async addScanTarget(scanTarget: ScanTarget) {
        this.list.push(scanTarget);
        return this.list[this.list.length-1];
    }

    async removeScanTarget(scanTarget: ScanTarget) {
        this.list = this.list.filter(oldTarget => !this.isEqualScanTarget(oldTarget, scanTarget));
        return scanTarget;
    }

    private isEqualScanTarget(target: ScanTarget, anotherTarget: ScanTarget): boolean {
        return target.ip === anotherTarget.ip && target.subnet_mask === anotherTarget.subnet_mask;
    }
}