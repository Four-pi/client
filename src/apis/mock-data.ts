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