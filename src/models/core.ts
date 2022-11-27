import { api } from "../apis";
import { isReviewedPortRequest, Report, User } from "./base";

export interface Address {
    ip: string;
    port: string;
    isOnline: boolean;
    isAuthorized: boolean;
    reports: Report[];
}

export function findAddress(ip: string, port: string): Address | undefined {
    const address = _findAddress(ip, port);
    if (address) return {...address};
    return undefined;
}

export function ensureFindAddress(ip: string, port: string): Address {
    return { ..._ensureFindAddress(ip, port) };
}

export function listAddress(): Address[] {
    return _addressList.slice();
}

export function listReport(): Report[] {
    return _reports.slice();
}

export function findAllAddressByReportId(id: string): Address[] {
    return _addressList.filter(address => address.reports.find(r => r.id === id) !== undefined);
}

export async function fetchAddress(force: boolean = false): Promise<Address[]> {
    if (!_isBusy && (force || _addressList.length === 0)) {
        _isBusy = true;
        _clearAddress();
        await _determineAllPorts();
        await _determineAutorizedPorts();
        await _determineOnlinePorts();
        _isBusy = false;
    }
    return listAddress();
}

var _isBusy: boolean = false;
var _addressList: Address[] = [];
var _reports: Report[] = [];

function _clearAddress() {
    _addressList = [];
}

function _findAddress(ip: string, port: string): Address | undefined {
    return _addressList.find(addr => addr.ip === ip && addr.port === port);
}

function _ensureFindAddress(ip: string, port: string): Address {
    const address = _findAddress(ip, port);
    return address ?? _addAddress(ip, port);
}

function _addAddress(ip: string, port: string, isOnline: boolean = false, isAuthorized: boolean = false): Address {
    const address: Address = { ip, port, isOnline, isAuthorized, reports: [] };
    _addressList.push(address);
    return address;
}

async function _determineAllPorts() {
    await api.port.request.list().then(arr => arr.forEach(x => {
        const address = _ensureFindAddress(x.ip, x.port);
        if (isReviewedPortRequest(x)) {
            address.isAuthorized = address.isAuthorized || (x.is_approved ?? false);
        }
    }));

    _reports = await api.scan.report.list()
        .then(reports => reports.sort((x, y) => y.created_at.localeCompare(x.created_at)));

    _reports.forEach(report => report.reports.forEach(x => {
        const address = _ensureFindAddress(x.ip, x.port);
        address.reports.push(report);
    }));
}

async function _determineAutorizedPorts() {
    await api.port.list().then(arr => arr.forEach(x => {
        const address = _ensureFindAddress(x.ip, x.port);
        address.isAuthorized = address.isAuthorized || x.is_open;
    }));
}

async function _determineOnlinePorts() {
    _reports.filter(wasOnlineRecently).forEach(report => report.reports.forEach(portReport => {
        _ensureFindAddress(portReport.ip, portReport.port).isOnline = true;
    }));
}

function wasOnlineRecently(report: Report): boolean {
    const timePassed = Date.now() - new Date(report.created_at).getTime();
    const allowedHours = 12;
    return timePassed < (allowedHours * 60 * 60 *1000);
}

export async function login(id: string, password: string) {
    const user = await api.user.auth(id, password);
    if (user) {
        _setUser(user);
        window.location.reload();
        return;
    }
    alert('해당하는 사용자가 없습니다.');
}

export async function logout() {
    _setUser(undefined);
    window.location.reload();
}

export function isLoggedIn(): boolean {
    return _getUser() !== undefined;
}

export function getCurrentUser(): User | undefined {
    return _getUser();
}

export function ensureGetCurrentUser(): User {
    const user = _getUser();
    if (user === undefined) {
        throw new Error("User not logged in");
    }
    return user;
}

function _getUser(): User | undefined {
    const user = window.sessionStorage.getItem('/user');
    try {
        return JSON.parse(user!) ?? undefined;
    } catch (e) {
        window.sessionStorage.removeItem('/user');
        return undefined;
    }
}

function _setUser(user: User | undefined) {
    if (!user) {
        window.sessionStorage.removeItem('/user');
    }
    window.sessionStorage.setItem('/user', JSON.stringify(user));
}