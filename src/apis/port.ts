export interface Port {
    ip: string;
    port: number;
    is_open: boolean;
}

export interface PortAPI {
    open(ip: string, port: number): Promise<Port | undefined>;
    close(ip: string, port: number): Promise<Port | undefined>;
    listPorts(): Promise<Port[]>;
    getActivePorts(): Promise<Port[]>;
}


export function includesPort(portList: Port[], port: Port): boolean {
    return portList.find((p) => p.ip === port.ip && p.port === port.port) !== undefined;
}

export class PortMockAPI implements PortAPI {
    private ports: Port[] = [
        { ip: 'localhost', port: 3000, is_open: true },
        { ip: 'localhost', port: 80, is_open: true },
        { ip: 'localhost', port: 8080, is_open: true },
        { ip: 'localhost', port: 9999, is_open: true },
    ];

    constructor() {
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.listPorts = this.listPorts.bind(this);
        this.getActivePorts = this.getActivePorts.bind(this);
    }

    private addPort(ip: string, port: number): Port {
        this.ports.push({
            ip, port, is_open: false
        });
        return this.ports[this.ports.length-1];
    }

    async open(ip: string, port: number) {
        console.log('/port/open', ip, port);
        const targetPort = this.ensureFindPost(ip, port);
        targetPort.is_open = true;
        return targetPort;
    }

    async close(ip: string, port: number) {
        console.log('/port/close', ip, port);
        const targetPort = this.ensureFindPost(ip, port);
        targetPort.is_open = false;
        return targetPort;
    }

    /**
     *
     * @returns
     */
    async listPorts() {
        console.log('/port/list', this.ports);
        return this.ports;
    }

    /**
     *
     * @returns
     */
    async getActivePorts(): Promise<Port[]> {
        console.log('/port/list?active', this.ports);
        return [
            this.ensureFindPost('localhost', 80),
            this.ensureFindPost('localhost', 4000),
        ];
    }

    private findPort(ip: string, port: number): Port | undefined {
        return this.ports.find(p => p.ip === ip && p.port === port);
    }

    private ensureFindPost(ip: string, port: number): Port {
        return this.findPort(ip, port) ?? this.addPort(ip, port);
    }
}