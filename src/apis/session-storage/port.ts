import type { Port } from "../../models/base";
import { sleep } from "../../utils";
import type * as api from "../base";
import { mockActivePorts, mockPorts } from "../mock-data";

export class PortAPI implements api.PortAPI {
    private sessionStoragePorts = '/port/list';

    getPorts(): Port[] {
        const sessionStorageData = window.sessionStorage.getItem(this.sessionStoragePorts);
        return sessionStorageData ? JSON.parse(sessionStorageData) : mockPorts;
    }

    setPorts(ports: Port[]) {
        window.sessionStorage.setItem(this.sessionStoragePorts, JSON.stringify(ports));
    }

    async open(ip: string, port: string) {
        await sleep(200);
        return await this.setIsOpen(ip, port, true);
    }

    async close(ip: string, port: string) {
        await sleep(200);
        return await this.setIsOpen(ip, port, false);
    }

    private async setIsOpen(ip: string, port: string, value: boolean): Promise<Port | undefined> {
        const address = this.getPorts().find(p => p.ip === ip && p.port === port);
        if (address) {
            address.is_open = value;
            return address;
        }
        const newPort: Port = { ip, port, is_open: value };
        this.setPorts([...this.getPorts(), newPort])
        return newPort;
    }

    async listPorts() {
        await sleep(1000);
        return this.getPorts();
    }

    async getActivePorts(): Promise<Port[]> {
        return mockActivePorts.map(p => ({
            is_open: false,
            ...p,
        }));
    }
}