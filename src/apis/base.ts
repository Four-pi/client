import axios, { AxiosRequestConfig } from "axios";

export class RestAPI {
    private axiosConfig: AxiosRequestConfig = {
        baseURL: 'http://211.203.128.59:3001/api',
    };
    protected client = axios.create(this.axiosConfig);
}