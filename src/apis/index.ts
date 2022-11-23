import { addLoggerProxy } from "../system/logger";
import type * as api from "./base";
import * as mock from "./mock";
import * as rest from "./rest";
import { PortAPI } from "./session-storage/port";

function loggerApplier<T extends Object>(x: T, enable: boolean): T {
    return enable ? addLoggerProxy(x) : x;
}

const useLogger: boolean = false;

export const reportApi: api.ReportAPI = loggerApplier(new mock.ReportAPI(), useLogger);
export const requestApi: api.RequestAPI = loggerApplier(new mock.RequestAPI(), useLogger);
export const scanApi: api.ScanAPI = loggerApplier(new mock.ScanAPI(), useLogger);
export const userApi: api.UserAPI = loggerApplier(new rest.UserAPI(), useLogger);
export const machineStatusApi: api.MachineStatusAPI = loggerApplier(new rest.MachineStatusAPI(), useLogger);
export const portApi: api.PortAPI = loggerApplier(new PortAPI(), useLogger);