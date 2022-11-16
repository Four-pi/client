import { User } from "./user";

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

export interface RequestAPI {
    createRequest(ip: string, port: string, usage: string): Promise<any>;
    getRequest(id: string): Promise<Request>;
    listRequests(): Promise<Request[]>;
    approveRequest(id: string): Promise<boolean>;
    rejectRequest(id: string): Promise<boolean>;
}

export class RequestMockAPI implements RequestAPI {
    async createRequest(ip: string, port: string, usage: string) {
        console.log('/port/request/create')
    }

    async getRequest(id: string) {
        console.log('/request/get');
        return {
            id: "",
            created_by: {
                id: 'test-user',
                name: "김보민",
                department: "모바일사업부",
                created_at: "2008-01-14T04:33:35Z",
            },
            created_at: "",
            ip: "",
            port: "",
            usage: "",
        }
    }

    async listRequests() {
        console.log('/request/list');
        return [
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
            }
        ];
    }

    async approveRequest(id: string) {
        console.log('/request/approve', id);
        return false;
    }

    async rejectRequest(id: string) {
        console.log('/request/reject', id);
        return false;
    }
}