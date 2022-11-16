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

export interface ReportAPI {
    getReport(id: string): Promise<Report>;
    listReports(): Promise<Report[]>;
}

export class ReportMockAPI implements ReportAPI {
    async getReport(id: string) {
        return {
            id,
            ip: 'localhost',
            subnet_mask: '24',
            created_at: "2022-11-02",
            ip_reports: [],
        };
    }

    async listReports() {
        return [
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
                id: '1',
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
    }
}