import type { MachineStatus, Port, Report, Request, ScanTarget, User } from "../models/base";

export interface UserAPI {
    listUsers(): Promise<User[]>;
    authUser(id: string, password: string): Promise<User | undefined>;
    getCurrentUser(): User | undefined;
    signup(
        id: string,
        password: string,
        name: string,
        department: string,
        mail?: string,
    ): Promise<User>;
    login(id: string, password: string): Promise<void>;
    logout(): Promise<void>;
    isLoggedIn(): boolean;
}

export interface PortAPI {
    open(ip: string, port: string): Promise<Port | undefined>;
    close(ip: string, port: string): Promise<Port | undefined>;
    listPorts(): Promise<Port[]>;
    getActivePorts(): Promise<Port[]>;
}

export interface RequestAPI {
    createRequest(ip: string, port: string, usage: string): Promise<any>;
    getRequest(id: string): Promise<Request>;
    listRequests(): Promise<Request[]>;
    approveRequest(id: string): Promise<boolean>;
    rejectRequest(id: string): Promise<boolean>;
}

export interface ScanAPI {
    scan(): Promise<Report>; // 즉시 스캔
    listScanTargets(): Promise<ScanTarget[]>;
    addScanTarget(ip: string, subnetMask: string | number | undefined): Promise<ScanTarget>;
    removeScanTarget(scanTarget: ScanTarget): Promise<ScanTarget>;
}

export interface ReportAPI {
    getReport(id: string): Promise<Report>;
    listReports(): Promise<Report[]>;
}

export interface MachineStatusAPI {
    monitor(): Promise<MachineStatus>;
}