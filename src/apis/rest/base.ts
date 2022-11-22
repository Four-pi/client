import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
    baseURL: "http://211.203.128.37:3001",
};

export const client = axios.create(axiosConfig);