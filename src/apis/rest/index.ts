import { MachineStatusAPI as RestMachineStatusAPI} from "./machine";
import { UserAPI as RestUserAPI } from "./user";
import { PortAPI as RestPortAPI } from "./port";
import { ScanAPI as RestScanAPI } from "./scan";
import { RequestAPI as RestRequestAPI } from "./request";

export const MachineStatusAPI = RestMachineStatusAPI;
export const RequestAPI = RestRequestAPI;
export const ScanAPI = RestScanAPI;
export const PortAPI = RestPortAPI;
export const UserAPI = RestUserAPI;
