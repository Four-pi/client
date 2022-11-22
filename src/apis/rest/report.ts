import { Report } from "../../models/base";
import type * as api from "../base";
import { client } from "./base";

export class ReportAPI implements api.ReportAPI {
    async getReport(id: string): Promise<Report> {
        throw new Error("Method not implemented.");
    }
    async listReports(): Promise<Report[]> {
        throw new Error("Method not implemented.");
    }
}
