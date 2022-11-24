import type { User, Port, Request, ScanTarget, Report, MachineStatus } from "../models/base";
import { sleep } from "../utils";
import { FourPiAPI } from "./base";
import * as data from "./mock-data";

export const mockAPI: FourPiAPI = {
    user: {
        list: async function (): Promise<User[]> {
            return data.mockUsers;
        },
        auth: async function (id: string, password: string): Promise<User | undefined> {
            return await this.get(id);
        },
        get: async function (id: string): Promise<User | undefined> {
            return await this.list().then(arr => arr.find(x => x.id === id));
        },
        create: async function (id: string, password: string, name: string, department: string, mail?: string | undefined): Promise<User> {
            const user: User = {
                id,
                name,
                department,
                mail,
                created_at: new Date().toISOString()
            }
            await this.list().then(arr => arr.push(user));
            return user;
        },
    },
    port: {
        open: async function (ip: string, port: string): Promise<Port | undefined> {
            return await this.get(ip, port).then(port => { if (port) port.is_open = true; return port; });
        },
        close: async function (ip: string, port: string): Promise<Port | undefined> {
            return await this.get(ip, port).then(port => { if (port) port.is_open = false; return port; });
        },
        get: async function (ip: string, port: string): Promise<Port | undefined> {
            return await this.list().then(arr => arr.find(x => x.ip === ip && x.port === port));
        },
        list: async function (): Promise<Port[]> {
            return data.mockPorts;
        },
        request: {
            create: async function (ip: string, port: string, usage: string): Promise<any> {
                throw new Error("Function not implemented.");
            },
            get: async function (id: string): Promise<Request | undefined> {
                return await this.list().then(arr => arr.find(x => x.id === id));
            },
            list: async function (): Promise<Request[]> {
                throw new Error("Function not implemented.");
            },
            approve: async function (id: string): Promise<boolean> {
                throw new Error("Function not implemented.");
            },
            reject: async function (id: string): Promise<boolean> {
                throw new Error("Function not implemented.");
            }
        }
    },
    scan: {
        target: {
            list: async function (): Promise<ScanTarget[]> {
                throw new Error("Function not implemented.");
            },
            create: async function (ip: string, subnetMask: string | undefined): Promise<ScanTarget> {
                throw new Error("Function not implemented.");
            }
        },
        report: {
            create: async function (): Promise<any> {
                throw new Error("Function not implemented.");
            },
            get: async function (id: string): Promise<Report | undefined> {
                throw new Error("Function not implemented.");
            },
            list: async function (): Promise<Report[]> {
                throw new Error("Function not implemented.");
            }
        }
    },
    monitor: async function (): Promise<MachineStatus> {
        await sleep(300);
        return {
            cpu: Math.random() / 10 + 0.3,
            disk: Math.random() / 50 + 0.2,
            memory: Math.random() / 10 + 0.8,
            network: Math.random() * Math.random() * Math.random(),
        };
    }
}
