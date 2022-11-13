import axios, { AxiosRequestConfig } from "axios";

export interface AddressInfo {
    host: string,
    port: number,
    modified: string,
}

export interface MachineUsageState {
    cpu?: number,
    disk?: number,
    memory?: number,
    network?: number
}

const debug_useMockup: boolean = false;

export class APIController {
    static readonly instance = new APIController();

    private axiosConfig: AxiosRequestConfig = {
        baseURL: 'http://211.203.128.59:3001/api',
    };
    private client = axios.create(this.axiosConfig);

    private constructor() { };

    async getOpenedAddressInfo(): Promise<AddressInfo[]> {
        if (debug_useMockup)
            return [];

        const response = await this.client.get('/ip_open');
        return response.data.map(convertAddress);
    }

    async getClosedAddressInfo(): Promise<AddressInfo[]> {
        if (debug_useMockup)
            return [];

        const response = await this.client.get('/ip_close');
        return response.data.map(convertAddress);
    }

    async getActiveAddressInfo(): Promise<AddressInfo[]> {
        if (debug_useMockup)
            return [];

        const response = await this.client.get('/ip_use');
        return response.data.map(convertAddress);
    }

    async getMachineUsageState(): Promise<MachineUsageState> {
        if (debug_useMockup)
            return {
                cpu: Math.random() / 10 + 0.3,
                disk: Math.random() / 50 + 0.2,
                memory: Math.random() / 10 + 0.8,
                network: Math.random() * Math.random() * Math.random(),
            };

        const response = await this.client.get('/monitoring');
        return convertMonitoring(response.data[0]);
    }
}

function convertAddress({ IP, PORT, DATE }: { IP: string, PORT: string, DATE: string }): AddressInfo {
    return {
        host: IP,
        port: parseInt(PORT),
        modified: new Date(DATE).toISOString()
    }
}

function convertMonitoring({ CPU, DISK, MEMORY }: { CPU: number, DISK: number, MEMORY: number }): MachineUsageState {
    return {
        cpu: CPU / 100,
        disk: DISK / 100,
        memory: MEMORY / 100,
        // network: undefined,
    }
}
