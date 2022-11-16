import { RestAPI } from "./base";

export interface MachineStatus {
    cpu?: number,
    disk?: number,
    memory?: number,
    network?: number
}

export interface MachineStatusAPI {
    monitor(): Promise<MachineStatus>;
}

export class MachineStatusMockAPI implements MachineStatusAPI {
    async monitor() {
        console.log('/monitor');
        return {
            cpu: Math.random() / 10 + 0.3,
            disk: Math.random() / 50 + 0.2,
            memory: Math.random() / 10 + 0.8,
            network: Math.random() * Math.random() * Math.random(),
        };
    }
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