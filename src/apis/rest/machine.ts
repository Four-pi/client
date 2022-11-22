import { sleep } from "../../utils";
import type * as api from "../base";
import { client } from "./base";

export class MachineStatusAPI implements api.MachineStatusAPI {
    async monitor() {
        await sleep(200);
        return await client.get('/monitoring')
            .then(response => response.data)
            .then(data => data[0])
            .then(data => {
                Object.entries<number>(data).forEach(([key, value]) => {
                    data[key] = value / 100;
                })
                return data;
            });
    }
}