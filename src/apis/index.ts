import type { User, Port, Request, ScanTarget, Report, MachineStatus } from "../models/base";
import type { FourPiAPI } from "./base";
import { mockAPI } from "./mock";
import { restAPI } from "./rest";

const options = {
    api: restAPI,
    logger: console.log,
}

export function setLogger(func: (x: any) => any) {
    options.logger = func;
}

export function isDemoEnabled(): boolean {
    return Boolean(window.sessionStorage.getItem('use-demo'));
}

export function toggleDemo() {
    if (isDemoEnabled()) {
        window.sessionStorage.removeItem('use-demo');
    } else {
        window.sessionStorage.setItem('use-demo', 'TRUE');
    }
    window.location.reload();
}

function setup() {
    if (isDemoEnabled()) {
        options.api = mockAPI;
    } else {
        options.api = restAPI;
    }
}

export const api: FourPiAPI = {
    user: {
        list: function (): Promise<User[]> {
            options.logger("/user/list");
            return options.api.user.list();
        },
        auth: function (id: string, password: string): Promise<User | undefined> {
            options.logger("/user/auth");
            return options.api.user.auth(id, password);
        },
        get: function (id: string): Promise<User | undefined> {
            options.logger("/user/get");
            return options.api.user.get(id);
        },
        create: function (id: string, password: string, name: string, department: string, mail?: string | undefined): Promise<User | undefined> {
            options.logger("/user/create");
            return options.api.user.create(id, password, name, department, mail);
        }
    },
    port: {
        get: function (ip: string, port: string): Promise<Port | undefined> {
            options.logger("/port/get");
            return options.api.port.get(ip, port);
        },
        list: function (): Promise<Port[]> {
            options.logger("/port/list");
            return options.api.port.list();
        },
        open: function (ip: string, port: string): Promise<Port | undefined> {
            options.logger("/port/open");
            return options.api.port.open(ip, port);
        },
        close: function (ip: string, port: string): Promise<Port | undefined> {
            options.logger("/port/close");
            return options.api.port.close(ip, port);
        },
        request: {
            create: function (ip: string, port: string, usage: string): Promise<any> {
                options.logger("/port/request/create");
                return options.api.port.request.create(ip, port, usage);
            },
            get: function (id: string): Promise<Request | undefined> {
                options.logger("/port/request/get");
                return options.api.port.request.get(id);
            },
            list: function (): Promise<Request[]> {
                options.logger("/port/request/list");
                return options.api.port.request.list();
            },
            approve: function (id: string): Promise<Request | undefined> {
                options.logger("/port/request/approve");
                return options.api.port.request.approve(id);
            },
            reject: function (id: string): Promise<Request | undefined> {
                options.logger("/port/request/reject");
                return options.api.port.request.reject(id);
            }
        }
    },
    scan: {
        target: {
            list: function (): Promise<ScanTarget[]> {
                options.logger("/scan/target/list");
                return options.api.scan.target.list();
            },
            create: function (ip: string, subnetMask: string | undefined): Promise<ScanTarget | undefined> {
                options.logger("/scan/target/add");
                return options.api.scan.target.create(ip, subnetMask);
            }
        },
        report: {
            create: function (): Promise<any> {
                options.logger("/scan/report/create");
                return options.api.scan.report.create();
            },
            get: function (id: string): Promise<Report | undefined> {
                options.logger("/scan/report/get");
                return options.api.scan.report.get(id);
            },
            list: function (): Promise<Report[]> {
                options.logger("/scan/report/list");
                return options.api.scan.report.list();
            }
        }
    },
    monitor: function (): Promise<MachineStatus> {
        options.logger("/monitor");
        return options.api.monitor();
    }
};

setup();