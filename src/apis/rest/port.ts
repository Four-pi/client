import { Port } from "../../models/base";
import type * as api from "../base";
import { client } from "./base";

export class PortAPI implements api.PortAPI {
    async open(ip: string, port: string): Promise<Port | undefined> {
        return await client.post('/open/port', { ip, port }).then(res => res.data);
    }
    async close(ip: string, port: string): Promise<Port | undefined> {
        return await client.post('/close/port', { ip, port }).then(res => res.data);
    }
    async listPorts(): Promise<Port[]> {
        throw new Error("Method not implemented.");
    }
    async getActivePorts(): Promise<Port[]> {
        throw new Error("Method not implemented.");
    }
}