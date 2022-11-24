export interface User {
    id: string;
    name: string;
    department: string,
    created_at: string;
    mail?: string;
}

export function isUser(x: any): x is User {
    return checkAttributes(x, "id", "name", "department", "created_at");
}

export function isPort(x: any): x is Port {
    return checkAttributes(x, "ip", "port", "is_open");
}

export function isPortRequest(x: any): x is Port {
    return checkAttributes(x, "id", "ip", "port", "usage", "created_by", "created_at");
}

export function isReviewedPortRequest(x: any): x is Port {
    return isPortRequest(x) && checkAttributes(x, "reviewed_by", "reviewed_at", "is_approved");
}

export function isScanTarget(x: any): x is ScanTarget {
    return checkAttributes(x, "ip");
}

export function isReport(x: any): x is Report {
    return checkAttributes(x, "id", "created_at", "reports") && x.reports.every(isPortReport);
}

export function isPortReport(x: any): x is PortReport {
    return checkAttributes(x, "ip", "port", "protocol", "service", "version");
}

function checkAttributes(x: any, ...attributes: string[]): boolean {
    if (x === undefined) {
        return false;
    }
    for (const attribute of attributes) {
        if (!(attribute in x)) {
            console.log('assertion failed', x);
            return false;
        }
    }
    return true;
}


export interface Request {
    id: string;
    created_by: User;
    created_at: string;
    ip: string;
    port: string;
    usage: string;
    reviewed_by?: User;
    reviewed_at?: string;
    is_approved?: boolean;
}

export interface Port {
    ip: string;
    port: string;
    is_open: boolean;
}

export interface ScanTarget {
    ip: string;
    subnet_mask?: string;
}

export interface Report {
    id: string;
    created_at: string;
    reports: PortReport[];
}

export interface PortReport {
    ip: string;
    port: string;
    protocol: string;
    service: string;
    version: string;
}

export interface MachineStatus {
    cpu?: number,
    disk?: number,
    memory?: number,
    network?: number
}