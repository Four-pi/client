import { portApi } from "../apis";

export interface SimplifiedAddress {
    ip: string;
    port: string;
    isOnline?: boolean;
    isAuthenticated?: boolean;
}

export async function getSimplifiedAddressList(): Promise<SimplifiedAddress[]> {
    const addressList: SimplifiedAddress[] = [];
    await portApi.listPorts().then(ports => ports.forEach(port => {
        addressList.push({
            ip: port.ip,
            port: port.port,
            isOnline: false,
            isAuthenticated: port.is_open
        });
    }));
    await portApi.getActivePorts().then(ports => ports.forEach(port => {
        let targetAddress = addressList.find(addr => addr.ip === port.ip && addr.port === port.port);
        if (targetAddress === undefined) {
            targetAddress = {
                ip: port.ip,
                port: port.port,
                isOnline: true,
                isAuthenticated: port.is_open
            }
            addressList.push(targetAddress);
        } else {
            targetAddress.isOnline = true;
        }
    }));
    return addressList;
}
