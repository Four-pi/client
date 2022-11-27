import type { User, Port, Request, ScanTarget, Report, MachineStatus } from "../models/base";
import { getCurrentUser } from "../models/core";
import { sleep } from "../utils";
import { FourPiAPI } from "./base";
import { MOCK_PORTS } from "./mock/ports";
import { MOCK_REPORTS, TEMPLATE_PORT_REPORTS } from "./mock/reports";
import { MOCK_REQUESTS } from "./mock/requests";
import { MOCK_SCAN_TARGET } from "./mock/scan-targets";
import { MOCK_USERS } from "./mock/users";


class SessionStorageHandler<T> {
    private items: T[] = [];

    constructor(
        public readonly key: string,
        private readonly initialValue: T[]
    ) {
        this.load(initialValue);
    }

    load(initialValue: T[]) {
        const loadedData = window.sessionStorage.getItem(this.key);
        this.items = loadedData ? JSON.parse(loadedData) : initialValue;
        this.save();
    }

    save() {
        window.sessionStorage.setItem(this.key, JSON.stringify(this.items));
    }

    reset() {
        this.set(this.initialValue);
    }

    get(): T[] {
        return this.items.slice();
    }

    set(value: T[]) {
        this.items = value;
        this.save();
    }

    add(value: T) {
        this.items.push(value);
        this.save();
    }

    remove(value: T) {
        this.items = this.items.filter(x => x === value);
        this.save();
    }
}

const userSessionStorage = new SessionStorageHandler('mock-user', MOCK_USERS);
const requestSessionStorage = new SessionStorageHandler('mock-request', MOCK_REQUESTS);
const portSessionStorage = new SessionStorageHandler('mock-port', MOCK_PORTS);
const scanTargetSessionStorage = new SessionStorageHandler('mock-scantarget', MOCK_SCAN_TARGET);
const scanReportSessionStorage = new SessionStorageHandler('mock-report', MOCK_REPORTS);

export function resetMockUps() {
    userSessionStorage.reset();
    requestSessionStorage.reset();
    portSessionStorage.reset();
    scanTargetSessionStorage.reset();
    scanReportSessionStorage.reset();
}

var currentUser: User | undefined = getCurrentUser();

export const mockAPI: FourPiAPI = {
    user: {
        list: async function (): Promise<User[]> {
            return userSessionStorage.get().map(x => ({
                id: x.id,
                name: x.name,
                department: x.department,
                mail: x.mail,
                created_at: x.created_at
            }));
        },
        auth: async function (id: string, password: string): Promise<User | undefined> {
            const authenticatedUser = userSessionStorage.get().find(x => x.id === id && x.password === password);
            currentUser = authenticatedUser;
            return await this.get(authenticatedUser?.id ?? '');
        },
        get: async function (id: string): Promise<User | undefined> {
            return await this.list().then(arr => arr.find(x => x.id === id));
        },
        create: async function (id: string, password: string, name: string, department: string, mail?: string | undefined): Promise<User | undefined> {
            if (await this.get(id)) {
                return undefined;
            }
            const user: User = {
                id,
                name,
                department,
                mail,
                created_at: new Date().toISOString()
            }
            userSessionStorage.add({ ...user, password })
            return user;
        },
    },
    port: {
        open: async function (ip: string, port: string): Promise<Port | undefined> {
            const x = await this.get(ip, port);
            x!.is_open = true;
            portSessionStorage.save();
            return x;
        },
        close: async function (ip: string, port: string): Promise<Port | undefined> {
            const x = await this.get(ip, port);
            x!.is_open = false;
            portSessionStorage.save();
            return x;
        },
        get: async function (ip: string, port: string): Promise<Port> {
            var x = portSessionStorage.get().find(x => x.ip === ip && x.port === port);
            if (!x) {
                x = { ip, port, is_open: false };
                portSessionStorage.add(x);
            }
            return x;
        },
        list: async function (): Promise<Port[]> {
            return portSessionStorage.get();
        },
        request: {
            create: async function (ip: string, port: string, usage: string): Promise<any> {
                const x: Request = {
                    id: Date.now().toString(),
                    ip,
                    port,
                    usage,
                    created_at: new Date().toISOString(),
                    created_by: currentUser!,
                };
                requestSessionStorage.add(x);
                return x;
            },
            get: async function (id: string): Promise<Request | undefined> {
                return requestSessionStorage.get().find(x => x.id === id);
            },
            list: async function (): Promise<Request[]> {
                return requestSessionStorage.get();
            },
            approve: async function (id: string): Promise<Request | undefined> {
                const x = requestSessionStorage.get().find(x => x.id === id);
                if (!x) return undefined;
                x.is_approved = true;
                x.reviewed_at = new Date().toISOString();
                x.reviewed_by = currentUser;
                requestSessionStorage.save();
                return x;
            },
            reject: async function (id: string): Promise<Request | undefined> {
                const x = requestSessionStorage.get().find(x => x.id === id);
                if (!x) return undefined;
                x.is_approved = false;
                x.reviewed_at = new Date().toISOString();
                x.reviewed_by = currentUser;
                requestSessionStorage.save();
                return x;
            }
        }
    },
    scan: {
        target: {
            list: async function (): Promise<ScanTarget[]> {
                return scanTargetSessionStorage.get();
            },
            create: async function (ip: string, subnetMask: string | undefined): Promise<ScanTarget> {
                const x: ScanTarget = { ip, subnet_mask: subnetMask };
                scanTargetSessionStorage.add(x);
                return x;
            }
        },
        report: {
            create: async function (): Promise<any> {
                scanReportSessionStorage.add({
                    id: (Math.ceil(Math.random() * 10000) + 10).toString(),
                    created_at: new Date(Date.now()).toISOString(),
                    reports: TEMPLATE_PORT_REPORTS
                });
                window.alert('스캔이 완료되었습니다.');
            },
            get: async function (id: string): Promise<Report | undefined> {
                return scanReportSessionStorage.get().find(x => x.id === id);
            },
            list: async function (): Promise<Report[]> {
                return scanReportSessionStorage.get();
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