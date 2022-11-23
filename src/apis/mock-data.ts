import { Port, Report, Request, ScanTarget, User } from "../models/base";

// 임시 사용자 목록
export const mockUsers: User[] = [
    {
        id: 'admin',
        name: "관리자-김동주",
        department: 'Four-Pi',
        created_at: new Date().toISOString(),
    },
    {
        id: 'test',
        name: "관리자-김동주",
        department: 'Four-Pi',
        created_at: new Date().toISOString(),
    },
    {
        id: 'rndhkrndhk',
        name: "녹두로",
        department: '모바일사업부',
        created_at: "2008-01-14T04:33:35Z",
    },
    {
        id: 'qhals',
        name: "와우",
        department: '모바일사업부',
        created_at: "2008-01-14T04:33:35Z",
    },
    {
        id: 'J-dragon',
        name: "이재용",
        department: '삼성',
        created_at: "2008-01-14T04:33:35Z",
    },
    {
        id: 'applelove',
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
        ip: "localhost",
        subnet_mask: "192.168.13.0",
        created_at: "2022-11-21",
        ip_reports: [
            {
                ip: "192.168.13.116",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.121",
                os: "",
                port_reports: [
                    {
                        port: "135",
                        protocol: "tcp",
                        service: "msrpc",
                        version: "Microsoft Windows RPC"
                    },
                    {
                        port: "139",
                        protocol: "tcp",
                        service: "netbios-ssn",
                        version: "Microsoft Windows netbios-ssn"
                    },
                    {
                        port: "443",
                        protocol: "tcp",
                        service: "ssl/https",
                        version: "VMware Workstation SOAP API 16.1.0"
                    },
                    {
                        port: "903",
                        protocol: "tcp",
                        service: "ssl/vmware-auth",
                        version: "VMware Authentication Daemon 1.10 (Uses VNC, SOAP)"
                    },
                    {
                        port: "1024",
                        protocol: "tcp",
                        service: "msrpc",
                        version: "Microsoft Windows RPC"
                    },
                    {
                        port: "1026",
                        protocol: "tcp",
                        service: "msrpc",
                        version: "Microsoft Windows RPC"
                    },
                    {
                        port: "3389",
                        protocol: "tcp",
                        service: "ms-wbt-server",
                        version: "Microsoft Terminal Services"
                    },
                    {
                        port: "5357",
                        protocol: "tcp",
                        service: "http",
                        version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
                    }
                ]
            },
            {
                ip: "192.168.13.129",
                os: "",
                port_reports: [
                    {
                        port: "80",
                        protocol: "tcp",
                        service: "soap",
                        version: "gSOAP 2.7"
                    },
                    {
                        port: "631",
                        protocol: "tcp",
                        service: "soap",
                        version: "gSOAP 2.7"
                    },
                    {
                        port: "8080",
                        protocol: "tcp",
                        service: "soap",
                        version: "gSOAP 2.7"
                    }
                ]
            },
            {
                ip: "192.168.13.170",
                os: "",
                port_reports: [
                    {
                        port: "5357",
                        protocol: "tcp",
                        service: "http",
                        version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
                    }
                ]
            },
            {
                ip: "192.168.13.172",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.174",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.175",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.176",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.177",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.179",
                os: "",
                port_reports: [
                    {
                        port: "5000",
                        protocol: "tcp",
                        service: "rtsp",
                        version: "AirTunes rtspd 665.13.1"
                    },
                    {
                        port: "7000",
                        protocol: "tcp",
                        service: "rtsp",
                        version: "AirTunes rtspd 665.13.1"
                    }
                ]
            },
            {
                ip: "192.168.13.181",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.182",
                os: "",
                port_reports: [
                    {
                        port: "135",
                        protocol: "tcp",
                        service: "msrpc",
                        version: "Microsoft Windows RPC"
                    },
                    {
                        port: "139",
                        protocol: "tcp",
                        service: "netbios-ssn",
                        version: "Microsoft Windows netbios-ssn"
                    },
                    {
                        port: "3306",
                        protocol: "tcp",
                        service: "mysql",
                        version: "MySQL (unauthorized)"
                    }
                ]
            },
            {
                ip: "192.168.13.183",
                os: "",
                port_reports: [
                    {
                        port: "135",
                        protocol: "tcp",
                        service: "msrpc",
                        version: "Microsoft Windows RPC"
                    },
                    {
                        port: "139",
                        protocol: "tcp",
                        service: "netbios-ssn",
                        version: "Microsoft Windows netbios-ssn"
                    },
                    {
                        port: "902",
                        protocol: "tcp",
                        service: "ssl/vmware-auth",
                        version: "VMware Authentication Daemon 1.10 (Uses VNC, SOAP)"
                    },
                    {
                        port: "912",
                        protocol: "tcp",
                        service: "vmware-auth",
                        version: "VMware Authentication Daemon 1.0 (Uses VNC, SOAP)"
                    },
                    {
                        port: "5357",
                        protocol: "tcp",
                        service: "http",
                        version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
                    },
                    {
                        port: "5800",
                        protocol: "tcp",
                        service: "vnc-http",
                        version: "TightVNC (user: desktop-pap9t6v; VNC TCP port: 5900)"
                    },
                    {
                        port: "5900",
                        protocol: "tcp",
                        service: "vnc",
                        version: "VNC (protocol 3.8)"
                    }
                ]
            },
            {
                ip: "192.168.13.185",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.187",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.190",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.191",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.193",
                os: "",
                port_reports: [
                    {
                        port: "903",
                        protocol: "tcp",
                        service: "ssl/vmware-auth",
                        version: "VMware Authentication Daemon 1.10 (Uses VNC, SOAP)"
                    },
                    {
                        port: "5357",
                        protocol: "tcp",
                        service: "http",
                        version: "Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)"
                    }
                ]
            },
            {
                ip: "192.168.13.194",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.195",
                os: "",
                port_reports: [
                    {
                        port: "3306",
                        protocol: "tcp",
                        service: "mysql",
                        version: "MySQL (unauthorized)"
                    }
                ]
            },
            {
                ip: "192.168.13.196",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.198",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.199",
                os: "",
                port_reports: []
            },
            {
                ip: "192.168.13.1",
                os: "",
                port_reports: [
                    {
                        port: "22",
                        protocol: "tcp",
                        service: "ssh",
                        version: "Cisco SSH 1.25 (protocol 1.99)"
                    }
                ]
            },
            {
                ip: "192.168.13.233",
                os: "",
                port_reports: [
                    {
                        port: "22",
                        protocol: "tcp",
                        service: "ssh",
                        version: "OpenSSH 7.6p1 Ubuntu 4ubuntu0.7 (Ubuntu Linux; protocol 2.0)"
                    }
                ]
            },
            {
                ip: "192.168.13.253",
                os: "",
                port_reports: [
                    {
                        port: "22",
                        protocol: "tcp",
                        service: "ssh",
                        version: "Cisco SSH 1.25 (protocol 1.99)"
                    },
                    {
                        port: "23",
                        protocol: "tcp",
                        service: "telnet",
                        version: "Cisco router telnetd"
                    }
                ]
            },
            {
                ip: "192.168.13.2",
                os: "",
                port_reports: [
                    {
                        port: "22",
                        protocol: "tcp",
                        service: "ssh",
                        version: "(protocol 2.0)"
                    },
                    {
                        port: "443",
                        protocol: "tcp",
                        service: "ssl/http",
                        version: "Cisco Wireless LAN Controller httpd"
                    },
                    {
                        port: "16080",
                        protocol: "tcp",
                        service: "http",
                        version: "OpenResty web app server 1.7.10.1"
                    }
                ]
            },
            {
                ip: "192.168.13.3",
                os: "",
                port_reports: [
                    {
                        port: "22",
                        protocol: "tcp",
                        service: "ssh",
                        version: "OpenSSH 7.8 (protocol 2.0)"
                    }
                ]
            }
        ]
    },
    {
        id: '1',
        ip: 'localhost',
        subnet_mask: '24',
        created_at: "2022-11-02",
        ip_reports: [
            {
                ip: "127.0.0.0",
                os: 'unknown',
                port_reports: [
                    {
                        port: "1",
                        protocol: "http",
                        service: "ssh",
                        version: "Nodejs",
                    },
                    {
                        port: "3000",
                        protocol: "http",
                        service: "ssh",
                        version: "Nodejs",
                    },
                    {
                        port: "3001",
                        protocol: "http",
                        service: "tcp",
                        version: "test",
                    }
                ]
            },
            {
                ip: "localhost",
                os: 'unknown',
                port_reports: [
                    {
                        port: "3000",
                        protocol: "http",
                        service: "ssh",
                        version: "Nodejs",
                    },
                    {
                        port: "3001",
                        protocol: "http",
                        service: "tcp",
                        version: "test",
                    },
                    {
                        port: "4000",
                        protocol: "http",
                        service: "tcp",
                        version: "test",
                    }
                ]
            },
            {
                ip: "127.0.0.2",
                os: 'unknown',
                port_reports: [
                    {
                        port: "3001",
                        protocol: "http",
                        service: "tcp",
                        version: "test",
                    }

                ]
            },
        ],
    },
    {
        id: '2',
        ip: 'localhost',
        subnet_mask: '24',
        created_at: "2022-11-01",
        ip_reports: [
            {
                ip: "google.com",
                os: 'unknown',
                port_reports: [
                    {
                        port: "1",
                        protocol: "http",
                        service: "ssh",
                        version: "Nodejs",
                    },
                    {
                        port: "3000",
                        protocol: "http",
                        service: "ssh",
                        version: "Nodejs",
                    },
                    {
                        port: "3001",
                        protocol: "http",
                        service: "tcp",
                        version: "test",
                    }
                ]
            },
            {
                ip: "naver.com",
                os: 'unknown',
                port_reports: [
                    {
                        port: "9000",
                        protocol: "http",
                        service: "ssh",
                        version: "Nodejs",
                    },
                    {
                        port: "9999",
                        protocol: "http",
                        service: "tcp",
                        version: "test",
                    }
                ]
            },
            {
                ip: "bobomin.co.kr",
                os: 'unknown',
                port_reports: [
                    {
                        port: "8080",
                        protocol: "http",
                        service: "tcp",
                        version: "test",
                    }

                ]
            },
            {
                ip: "hepheir.github.io",
                os: 'unknown',
                port_reports: [
                    {
                        port: "80",
                        protocol: "http",
                        service: "ssh",
                        version: "Jekyll",
                    },
                    {
                        port: "3001",
                        protocol: "http",
                        service: "ssh",
                        version: "Linux",
                    },
                    {
                        port: "4000",
                        protocol: "http",
                        service: "tcp",
                        version: "Docker",
                    }
                ]
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