import axios, { AxiosRequestConfig } from "axios";
import type { MachineStatus } from "../models/base";
import { MachineStatusAPI } from "./base";

export class RestAPI {
    private axiosConfig: AxiosRequestConfig = {
        baseURL: 'http://211.203.128.59:3001/api',
    };
    protected client = axios.create(this.axiosConfig);
}

export class MachineStatusRestAPI extends RestAPI implements MachineStatusAPI {
    async monitor() {
        const response = await this.client.get('/monitoring');
        return this.convertMonitoring(response.data[0]);
    }

    convertMonitoring({ CPU, DISK, MEMORY }: { CPU: number, DISK: number, MEMORY: number }): MachineStatus {
        return {
            cpu: CPU / 100,
            disk: DISK / 100,
            memory: MEMORY / 100,
            // network: undefined,
        }
    }
}