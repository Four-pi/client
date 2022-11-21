import type { User } from "../../models/base";
import type * as api from "../base";
import { sleep } from "../../utils";
import { mockUsers } from "../mock-data";

export class UserAPI implements api.UserAPI {
    private sessionStorageCurrentUser = '/user/current';
    private sessionStorageUsers = '/user/list';

    getCurrentUser(): User | undefined {
        const sessionStorageData = window.sessionStorage.getItem(this.sessionStorageCurrentUser);
        return sessionStorageData ? JSON.parse(sessionStorageData) : undefined;
    }

    setCurrentUser(user: User | undefined) {
        if (!user) {
            window.sessionStorage.removeItem(this.sessionStorageCurrentUser);
        } else {
            window.sessionStorage.setItem(this.sessionStorageCurrentUser, JSON.stringify(user));
        }
    }

    getUsers(): User[] {
        const sessionStorageData = window.sessionStorage.getItem(this.sessionStorageUsers);
        return sessionStorageData ? JSON.parse(sessionStorageData) : mockUsers;
    }

    setUsers(users: User[]) {
        window.sessionStorage.setItem(this.sessionStorageUsers, JSON.stringify(users));
    }

    async authUser(id: string, password: string) {
        await sleep(200);
        const user = this.getUsers().find(u => u.id === id)
        this.setCurrentUser(user);
        return user;
    }

    async findUser(id: string) {
        return this.getUsers().find(usr => usr.id === id);
    }

    async signup(id: string, password: string, name: string, department: string, mail?: string | undefined) {
        const user: User = {
            id,
            name: name,
            department: department,
            created_at: new Date().toISOString(),
            mail: mail ?? '',
        };
        this.setUsers([...this.getUsers(), user]);
        return user;
    }

    async listUsers() {
        await sleep(1000);
        return this.getUsers();
    }

    async login(id: string, password: string): Promise<void> {
        await sleep(1000);
        await this.authUser(id, password);
    }

    async logout(): Promise<void> {
        await sleep(1000);
        this.setCurrentUser(undefined);
    }

    isLoggedIn(): boolean {
        return this.getCurrentUser() !== undefined;
    }
}