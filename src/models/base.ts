export interface User {
    id: string;
    name: string;
    department: string,
    created_at: string;
    mail?: string;
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
    ip: string;
    subnet_mask: string;
    created_at: string;
    ip_reports: IPReport[];
}

export interface IPReport {
    ip: string;
    os: string;
    port_reports: PortReport[];
}

export interface PortReport {
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