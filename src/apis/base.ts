import type { MachineStatus, Port, Report, Request, ScanTarget, User } from "../models/base";

export type FourPiAPI = {
    user: {
        list: () => Promise<User[]>;
        auth: (id: string, password: string) => Promise<User | undefined>;
        get: (id: string) => Promise<User | undefined>;
        create: (
            id: string,
            password: string,
            name: string,
            department: string,
            mail?: string,
        ) => Promise<User | undefined>;
    },
    port: {
        get: (ip: string, port: string) => Promise<Port | undefined>;
        list: () => Promise<Port[]>;
        open: (ip: string, port: string) => Promise<Port | undefined>;
        close: (ip: string, port: string) => Promise<Port | undefined>;
        request: {
            create: (ip: string, port: string, usage: string) => Promise<Request | undefined>;
            get: (id: string) => Promise<Request | undefined>;
            list: () => Promise<Request[]>;
            approve: (id: string) => Promise<boolean>;
            reject: (id: string) => Promise<boolean>;
        }
    },
    scan: {
        target: {
            create: (ip: string, subnetMask: string | undefined) => Promise<ScanTarget | ScanTarget>;
            list: () => Promise<ScanTarget[]>;
        },
        report: {
            create: () => Promise<any>;
            get: (id: string) => Promise<Report | undefined>;
            list: () => Promise<Report[]>;
        }
    },
    monitor: () => Promise<MachineStatus>;
}
