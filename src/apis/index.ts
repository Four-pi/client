import { addLoggerProxy } from "../system/logger";
import type * as api from "./base";
import * as mock from "./mock";
import { UserAPI } from "./session-storage/user";
import { PortAPI } from "./session-storage/port";

export const reportApi: api.ReportAPI = addLoggerProxy(new mock.ReportAPI());
export const requestApi: api.RequestAPI = addLoggerProxy(new mock.RequestAPI());
export const scanApi: api.ScanAPI = addLoggerProxy(new mock.ScanAPI());
export const userApi: api.UserAPI = addLoggerProxy(new UserAPI());
export const machineStatusApi: api.MachineStatusAPI = addLoggerProxy(new mock.MachineStatusAPI());
export const portApi: api.PortAPI = addLoggerProxy(new PortAPI());