export interface LoginUser {
    id: string;
    name: string;
    isAdmin: boolean;
}

export class LoginController {
    static readonly instance = new LoginController();

    private _user: LoginUser | null = null;
    private callbacks: ((...args: any[]) => any)[] = [];

    private constructor() {

    }

    get user(): LoginUser | null {
        return this._user;
    }

    onDidLoginStateChange(callback: (...args: any[]) => any, thisArg?: any) {
        this.callbacks.push(callback.bind(thisArg));
    }

    isLoggedIn(): boolean {
        return this._user !== null;
    }

    isLoggedInAsAdmin(): boolean {
        return this._user !== null && this._user.isAdmin;
    }

    async login(id: string, password: string) {
        this._user = {
            id,
            name: '테스트',
            isAdmin: true,
        }
        this.callbacks.forEach(c => c());
    }

    async signup(id: string, password: string) {

    }

    async logout() {
        this._user = null;
        this.callbacks.forEach(c => c());
    }
}