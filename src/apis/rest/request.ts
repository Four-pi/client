import { Request } from "../../models/base";
import type * as api from "../base";
import { client } from "./base";

export class RequestAPI implements api.RequestAPI {
    async createRequest(ip: string, port: string, usage: string): Promise<any> {
        return await client.post('/create/request', {
            ip, port, usage
        }).then(res => res.data);
    }
    async getRequest(id: string): Promise<Request> {
        return await client.get('/get/request/'+id).then(res => res.data);
    }
    async listRequests(): Promise<Request[]> {
        return await client.get('/list/request').then(res => res.data);
    }
    async approveRequest(id: string): Promise<boolean> {
        return await client.get('/request/auth/'+id).then(res => res.data);
    }
    async rejectRequest(id: string): Promise<boolean> {
        return await client.get('/request/reject/'+id).then(res => res.data);
    }
}