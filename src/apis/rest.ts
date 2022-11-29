import axios, { AxiosRequestConfig } from "axios";
import type { User, Port, Request, ScanTarget, Report, MachineStatus } from "../models/base";
import { sleep } from "../utils";
import type { FourPiAPI } from "./base";

const axiosConfig: AxiosRequestConfig = {
    baseURL: "http://localhost:3001",
};

const client = axios.create(axiosConfig);

export const restAPI: FourPiAPI = {
    user: {
        list: async function (): Promise<User[]> {
            return await client.get('/list/user').then(res => res.data ?? []);
        },
        auth: async function (id: string, password: string): Promise<User | undefined> {
            return await client.post('/auth/user', {
                user_id: id,
                password
            })
                .then(res => res.data)
                .then(data => {
                    if (data?.isError) return undefined;
                    return data?.data;
                });
        },
        get: async function (id: string): Promise<User | undefined> {
            return await client.get('/get/' + id).then(res => res.data);
        },
        create: async function (id: string, password: string, name: string, department: string, mail?: string | undefined): Promise<User | undefined> {
            return await client.post('/create/user', {
                user_id: id,
                password,
                user_name: name,
                department_name: department,
                mail,
            })
                .then(res => res.data)
                .then(data => data ? {
                    ...data,
                    mail: data.mail ?? undefined
                } : undefined);
        }
    },
    port: {
        open: async function (ip: string, port: string): Promise<Port | undefined> {
            return await client.post('/open/port', { ip, port })
                .then(async () => await this.get(ip, port));
        },
        close: async function (ip: string, port: string): Promise<Port | undefined> {
            return await client.post('/close/port', { ip, port })
                .then(async () => await this.get(ip, port));
        },
        get: async function (ip: string, port: string): Promise<Port | undefined> {
            const foundPort = await this.list().then(arr => arr.find(x => x.ip === ip && x.port === port));
            return foundPort ?? {
                ip,
                port,
                is_open: false,
            };
        },
        list: async function (): Promise<Port[]> {
            return await client.get('/Port/list')
                .then(res => res.data ?? [])
                .then(data => data.map((x: Port) => ({
                    ...x,
                    port: x.port.toString()
                })));
        },
        request: {
            create: async function (ip: string, port: string, usage: string): Promise<Request | undefined> {
                return await client.post('/create/request', {
                    ip,
                    port,
                    usage
                })
                .then(res => res.data)
                .then(data => data ? data : undefined);
            },
            get: async function (id: string): Promise<Request> {
                return await client.get('/get/request/' + id).then(res => res.data);
            },
            list: async function (): Promise<Request[]> {
                return await client.get('/list/request').then(res => res.data);
            },
            approve: async function (id: string): Promise<Request | undefined> {
                return await client.get('/request/auth/' + id).then(res => res.data);
            },
            reject: async function (id: string): Promise<Request | undefined> {
                return await client.get('/request/reject/' + id).then(res => res.data);
            }
        }
    },
    scan: {
        target: {
            list: async function (): Promise<ScanTarget[]> {
                return await client.get('/list/ScanTarget').then(res => res.data)
                    .then(data => data.map((scanTarget: ScanTarget) => ({
                        ip: scanTarget.ip,
                        subnet_mask: scanTarget.subnet_mask?.toString()
                    })));
            },
            create: async function (ip: string, subnetMask: string | undefined): Promise<ScanTarget> {
                return await client.post('/add/ScanTarget', {
                    ip,
                    subnet_mask: subnetMask
                }).then(res => res.data);
            },
        },
        report: {
            create: async function (): Promise<void> {
                await client.get('/Scan');
            },
            get: async function (id: string): Promise<Report | undefined> {
                return this.list().then(reports => reports.find(report => report.id === id));
            },
            list: async function (): Promise<Report[]> {
                return await client.get('/list/Scan').then(res => res.data);
            }
        }
    },
    monitor: async function (): Promise<MachineStatus> {
        return await client.get('/monitoring').then(res => res.data)
            .then(async data => {
                data = data[0];
                Object.entries<number>(data).forEach(([key, value]) => {
                    data[key] = value / 100;
                })
                console.log(data);
                await sleep(200);
                return data;
            });
    }
}