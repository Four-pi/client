import type { User, Port, Request, ScanTarget, Report, MachineStatus } from "../models/base";
import { sleep } from "../utils";
import { FourPiAPI } from "./base";

type MockUser = User & {
    password: string;
}

export const mockAPI: FourPiAPI = {
    user: {
        list: async function (): Promise<User[]> {
            return mockUsers.slice();
        },
        auth: async function (id: string, password: string): Promise<User | undefined> {
            return mockUsers.find(x => x.id === id && x.password === password);
        },
        get: async function (id: string): Promise<User | undefined> {
            return await this.list().then(arr => arr.find(x => x.id === id));
        },
        create: async function (id: string, password: string, name: string, department: string, mail?: string | undefined): Promise<User| undefined> {
            if (await this.get(id)) {
                return undefined;
            }
            const user: MockUser = {
                id,
                name,
                password,
                department,
                mail,
                created_at: new Date().toISOString()
            }
            mockUsers.push(user);
            return user;
        },
    },
    port: {
        open: async function (ip: string, port: string): Promise<Port | undefined> {
            const x = await this.get(ip, port);
            x!.is_open = true;
            return x;
        },
        close: async function (ip: string, port: string): Promise<Port | undefined> {
            const x = await this.get(ip, port);
            x!.is_open = false;
            return x;
        },
        get: async function (ip: string, port: string): Promise<Port> {
            const arr = await this.list();
            var x = arr.find(x => x.ip === ip && x.port === port);
            if (!x) {
                x = { ip, port, is_open: false };
                arr.push(x);
            }
            return x;
        },
        list: async function (): Promise<Port[]> {
            return mockPorts;
        },
        request: {
            create: async function (ip: string, port: string, usage: string): Promise<any> {
                const x: Request = {
                    id: Date.now().toString(),
                    ip,
                    port,
                    usage,
                    created_at: new Date().toISOString(),
                    created_by: mockUsers[0],
                };
                mockRequests.push(x);
                return x;
            },
            get: async function (id: string): Promise<Request | undefined> {
                return mockRequests.find(x => x.id === id);
            },
            list: async function (): Promise<Request[]> {
                return mockRequests.slice();
            },
            approve: async function (id: string): Promise<Request | undefined> {
                const x = mockRequests.find(x => x.id === id);
                if (!x) return undefined;
                x.is_approved = true;
                x.reviewed_at = new Date().toISOString();
                x.reviewed_by = mockUsers[0];
                return x;
            },
            reject: async function (id: string): Promise<Request | undefined> {
                const x = mockRequests.find(x => x.id === id);
                if (!x) return undefined;
                x.is_approved = false;
                x.reviewed_at = new Date().toISOString();
                x.reviewed_by = mockUsers[0];
                return x;
            }
        }
    },
    scan: {
        target: {
            list: async function (): Promise<ScanTarget[]> {
                return mockScanTargets;
            },
            create: async function (ip: string, subnetMask: string | undefined): Promise<ScanTarget> {
                const arr = await this.list();
                const x: ScanTarget = { ip, subnet_mask: subnetMask };
                arr.push(x);
                return x;
            }
        },
        report: {
            create: async function (): Promise<any> {
                alert("즉시 스캔 기능은 현재 지원하지 않습니다.")
            },
            get: async function (id: string): Promise<Report | undefined> {
                return mockReports.find(x => x.id === id);
            },
            list: async function (): Promise<Report[]> {
                return mockReports;
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

// 임시 사용자 목록
export const mockUsers: MockUser[] = [
    {
        id: 'admin',
        name: "관리자-김동주",
        password: 'admin',
        department: 'Four-Pi',
        created_at: new Date().toISOString(),
    },
    {
        id: 'test',
        name: "관리자-김동주",
        password: 'admin',
        department: 'Four-Pi',
        created_at: new Date().toISOString(),
    },
    {
        id: 'rndhkrndhk',
        name: "녹두로",
        password: 'admin',
        department: '모바일사업부',
        created_at: "2008-01-14T04:33:35Z",
    },
    {
        id: 'qhals',
        name: "와우",
        password: 'admin',
        department: '모바일사업부',
        created_at: "2008-01-14T04:33:35Z",
    },
    {
        id: 'J-dragon',
        password: 'admin',
        name: "이재용",
        department: '삼성',
        created_at: "2008-01-14T04:33:35Z",
    },
    {
        id: 'applelove',
        password: 'admin',
        name: "팀쿡",
        department: 'Apple',
        created_at: "2008-01-14T04:33:35Z",
    }
];

// 임시 포트요청 목록
export const mockRequests: Request[] = [
    {
        id: "1",
        created_by: {
            id: 'test-user',
            name: "김보민",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "3000",
        usage: "장난감",
    },
    {
        id: "2",
        created_by: {
            id: 'tet-user',
            name: "김동주",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "3000",
        usage: "서버 열기",
    },
    {
        id: "3",
        created_by: {
            id: 'tet-user',
            name: "김동주",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "3001",
        usage: "",
    },
    {
        id: "4",
        created_by: {
            id: 'tet-user',
            name: "김동주",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "3002",
        usage: "",
    },
    {
        id: "5",
        created_by: {
            id: 'test-user',
            name: "김보민",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "4000",
        usage: "",
        reviewed_at: "2008-01-14T04:33:35Z",
        reviewed_by: {
            id: 'test-user',
            name: "김보민",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        is_approved: true
    },
    {
        id: "6",
        created_by: {
            id: 'test-user',
            name: "김보민",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "4020",
        usage: "",
        reviewed_at: "2008-01-14T04:33:35Z",
        reviewed_by: {
            id: 'test-user',
            name: "김보민",
            department: "모바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        is_approved: false
    },
    {
        id: "7",
        created_by: {
            id: 'tet-user',
            name: "김동주",
            department: "모aa바일사업부",
            created_at: "2008-01-14T04:33:35Z",
        },
        created_at: "2008-01-14T04:33:35Z",
        ip: "localhost",
        port: "1874",
        usage: "",
    },
];

export const mockReports: Report[] = [
    {
        id: "0",
        created_at: "2022-11-21",
        reports: [
            {
                ip: "192.168.13.121",
                port: "135",
                protocol: "tcp",
                service: "msrpc",
                version: "Microsoft Windows RPC"
            },
            {
                ip: "192.168.13.121",
                port: "139",
                protocol: "tcp",
                service: "netbios-ssn",
                version: "Microsoft Windows netbios-ssn"
            },
            {
                ip: "192.168.13.121",
                port: "443",
                protocol: "tcp",
                service: "ssl/https",
                version: "VMware Workstation SOAP API 16.1.0"
            },
            {
                ip: "192.168.13.121",
                port: "903",
                protocol: "tcp",
                service: "ssl/vmware-auth",
                version: "VMware Authentication Daemon 1.10 (Uses VNC, SOAP)"
            },
            {
                ip: "192.168.13.121",
                port: "1024",
                protocol: "tcp",
                service: "msrpc",
                version: "Microsoft Windows RPC"
            },
            {
                ip: "192.168.13.121",
                port: "1026",
                protocol: "tcp",
                service: "msrpc",
                version: "Microsoft Windows RPC"
            },
            {
                ip: "192.168.13.121",
                port: "3389",
                protocol: "tcp",
                service: "ms-wbt-server",
                version: "Microsoft Terminal Services"
            },
            {
                ip: "192.168.13.121",
                port: "5357",
                protocol: "tcp",
                service: "http",
                version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
            },
            {
                ip: "192.168.13.129",
                port: "80",
                protocol: "tcp",
                service: "soap",
                version: "gSOAP 2.7"
            },
            {
                ip: "192.168.13.129",
                port: "631",
                protocol: "tcp",
                service: "soap",
                version: "gSOAP 2.7"
            },
            {
                ip: "192.168.13.129",
                port: "8080",
                protocol: "tcp",
                service: "soap",
                version: "gSOAP 2.7"
            },
            {
                ip: "192.168.13.170",
                port: "5357",
                protocol: "tcp",
                service: "http",
                version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
            },
            {
                ip: "192.168.13.179",
                port: "5000",
                protocol: "tcp",
                service: "rtsp",
                version: "AirTunes rtspd 665.13.1"
            },
            {
                ip: "192.168.13.179",
                port: "7000",
                protocol: "tcp",
                service: "rtsp",
                version: "AirTunes rtspd 665.13.1"
            },
            {
                ip: "192.168.13.182",
                port: "135",
                protocol: "tcp",
                service: "msrpc",
                version: "Microsoft Windows RPC"
            },
            {
                ip: "192.168.13.182",
                port: "139",
                protocol: "tcp",
                service: "netbios-ssn",
                version: "Microsoft Windows netbios-ssn"
            },
            {
                ip: "192.168.13.182",
                port: "3306",
                protocol: "tcp",
                service: "mysql",
                version: "MySQL (unauthorized)"
            },
            {
                ip: "192.168.13.183",
                port: "135",
                protocol: "tcp",
                service: "msrpc",
                version: "Microsoft Windows RPC"
            },
            {
                ip: "192.168.13.183",
                port: "139",
                protocol: "tcp",
                service: "netbios-ssn",
                version: "Microsoft Windows netbios-ssn"
            },
            {
                ip: "192.168.13.183",
                port: "902",
                protocol: "tcp",
                service: "ssl/vmware-auth",
                version: "VMware Authentication Daemon 1.10 (Uses VNC, SOAP)"
            },
            {
                ip: "192.168.13.183",
                port: "912",
                protocol: "tcp",
                service: "vmware-auth",
                version: "VMware Authentication Daemon 1.0 (Uses VNC, SOAP)"
            },
            {
                ip: "192.168.13.183",
                port: "5357",
                protocol: "tcp",
                service: "http",
                version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
            },
            {
                ip: "192.168.13.183",
                port: "5800",
                protocol: "tcp",
                service: "vnc-http",
                version: "TightVNC (user: desktop-pap9t6v; VNC TCP port: 5900)"
            },
            {
                ip: "192.168.13.183",
                port: "5900",
                protocol: "tcp",
                service: "vnc",
                version: "VNC (protocol 3.8)"
            },
            {
                ip: "192.168.13.193",
                port: "903",
                protocol: "tcp",
                service: "ssl/vmware-auth",
                version: "VMware Authentication Daemon 1.10 (Uses VNC, SOAP)"
            },
            {
                ip: "192.168.13.193",
                port: "5357",
                protocol: "tcp",
                service: "http",
                version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
            },
            {
                ip: "192.168.13.195",
                port: "3306",
                protocol: "tcp",
                service: "mysql",
                version: "MySQL (unauthorized)"
            },
            {
                ip: "192.168.13.1",
                port: "22",
                protocol: "tcp",
                service: "ssh",
                version: "Cisco SSH 1.25 (protocol 1.99)"
            },
            {
                ip: "192.168.13.233",
                port: "22",
                protocol: "tcp",
                service: "ssh",
                version: "OpenSSH 7.6p1 Ubuntu 4ubuntu0.7 (Ubuntu Linux; protocol 2.0)"
            },
            {
                ip: "192.168.13.253",
                port: "22",
                protocol: "tcp",
                service: "ssh",
                version: "Cisco SSH 1.25 (protocol 1.99)"
            },
            {
                ip: "192.168.13.253",
                port: "23",
                protocol: "tcp",
                service: "telnet",
                version: "Cisco router telnetd"
            },
            {
                ip: "192.168.13.2",
                port: "22",
                protocol: "tcp",
                service: "ssh",
                version: "(protocol 2.0)"
            },
            {
                ip: "192.168.13.2",
                port: "443",
                protocol: "tcp",
                service: "ssl/http",
                version: "Cisco Wireless LAN Controller httpd"
            },
            {
                ip: "192.168.13.2",
                port: "16080",
                protocol: "tcp",
                service: "http",
                version: "OpenResty web app server 1.7.10.1"
            },
            {
                ip: "192.168.13.3",
                port: "22",
                protocol: "tcp",
                service: "ssh",
                version: "OpenSSH 7.8 (protocol 2.0)"
            }
        ]
    },
    {
        id: '1',
        created_at: "2022-11-02",
        reports: [
            {
                ip: "127.0.0.0",
                port: "1",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "127.0.0.0",
                port: "3000",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "127.0.0.0",
                port: "3001",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "localhost",
                port: "3000",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "localhost",
                port: "3001",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "localhost",
                port: "4000",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "127.0.0.2",
                port: "3001",
                protocol: "http",
                service: "tcp",
                version: "test",
            }
        ],
    },
    {
        id: '2',
        created_at: "2022-11-01",
        reports: [
            {
                ip: "google.com",
                port: "1",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "google.com",
                port: "3000",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "google.com",
                port: "3001",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "naver.com",
                port: "9000",
                protocol: "http",
                service: "ssh",
                version: "Nodejs",
            },
            {
                ip: "naver.com",
                port: "9999",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "bobomin.co.kr",
                port: "8080",
                protocol: "http",
                service: "tcp",
                version: "test",
            },
            {
                ip: "hepheir.github.io",
                port: "80",
                protocol: "http",
                service: "ssh",
                version: "Jekyll",
            },
            {
                ip: "hepheir.github.io",
                port: "3001",
                protocol: "http",
                service: "ssh",
                version: "Linux",
            },
            {
                ip: "hepheir.github.io",
                port: "4000",
                protocol: "http",
                service: "tcp",
                version: "Docker",
            },
        ],
    }
];

export const mockScanTargets: ScanTarget[] = [
    { ip: "127.0.0.1", subnet_mask: "24" },
    { ip: "8.8.8.8" },
    { ip: "bobomin.co.kr" },
    { ip: "google.com" },
    { ip: "192.168.0.1", subnet_mask: "8" },
];

export const mockPorts: Port[] = [
    { ip: 'localhost', port: "3000", is_open: true },
    { ip: 'localhost', port: "80", is_open: true },
    { ip: 'localhost', port: "8080", is_open: true },
    { ip: 'localhost', port: "9999", is_open: true },
];

export const mockActivePorts: { ip: string, port: string }[] = [
    { ip: 'localhost', port: "80" },
    { ip: 'localhost', port: "4000" },

]