import { api } from "../apis";
import { User } from "./base";

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

export function getCurrentUser(): User {
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