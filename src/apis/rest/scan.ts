import { Report, ScanTarget } from "../../models/base";
import type * as api from "../base";
import { client } from "./base";

export class ScanAPI implements api.ScanAPI {
    async scan(): Promise<Report> {
        throw new Error("Method not implemented.");
    }
    async listScanTargets(): Promise<ScanTarget[]> {
        return await client.get('/list/ScanTarget')
            .then(res => res.data)
            .then(data => data.map((scanTarget: ScanTarget) => ({
                ip: scanTarget.ip,
                subnet_mask: scanTarget.subnet_mask?.toString()
            })));
    }
    async addScanTarget(ip: string, subnetMask: string | number | undefined): Promise<ScanTarget> {
        return await client.post('/add/ScanTarget', {
            ip, subnet_mask: subnetMask
        })
            .then(res => res.data);
    }
    async removeScanTarget(scanTarget: ScanTarget): Promise<ScanTarget> {
        throw new Error("Method not implemented.");
    }

}