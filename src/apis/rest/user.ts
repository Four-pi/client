import { User } from "../../models/base";
import type * as api from "../base";
import { client } from "./base";

export class UserAPI implements api.UserAPI {
    private sessionStorageCurrentUser = '/user/current';

    async listUsers(): Promise<User[]> {
        return await client.get('/list/user').then(res => res.data).then(data => data ?? []);
    }
    async authUser(id: string, password: string): Promise<User | undefined> {
        return await client.post('/auth/user', {
            id, password
        }).then(res => res.data)
        .then(user => {
            this.setCurrentUser(user);
            return user;
        });
    }

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

    async signup(id: string, password: string, name: string, department: string, mail?: string | undefined): Promise<User> {
        return await client.post('/create/user', {
            id, password, user_name: name, department_name: department, mail
        }).then(res => res.data);
    }
    async login(id: string, password: string): Promise<void> {
        await this.authUser(id, password);
    }
    async logout(): Promise<void> {
        this.setCurrentUser(undefined);;
    }
    isLoggedIn(): boolean {
        return this.getCurrentUser() !== undefined;
    }

}