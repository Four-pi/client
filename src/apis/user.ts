export interface User {
    id: string;
    name: string;
    department: string,
    created_at: string;
    mail?: string;
}

export interface Department {
    name: string;
    company: string;
}

export interface UserAPI {
    createUser(
        id: string,
        password: string,
        user_name: string,
        department: string,
        mail?: string,
        contact?: string
    ): Promise<User>;
    getUser(id: string): Promise<User>;
    listUsers(): Promise<User[]>;
    authUser(id: string, password: string): Promise<User | undefined>;
    getCurrentUser(): Promise<User | undefined>;
    updateUser(user: User): Promise<User>;
}

export class UserMockAPI implements UserAPI {
    private currentUser?: User;

    async authUser(id: string, password: string) {
        this.currentUser = {
            id: id,
            name: "김보민",
            department: '모바일사업부',
            created_at: "2008-01-14T04:33:35Z",
        };
        return this.currentUser;
    }

    async getCurrentUser() {
        return this.currentUser;
    }

    async getUser(id: string) {
        return {
            id: id,
            name: "김보민",
            department: '모바일사업부',
            created_at: "2008-01-14T04:33:35Z",
        };
    }

    async createUser(id: string, password: string, user_name: string, department_name: string, mail?: string | undefined) {
        this.currentUser = {
            id,
            name: user_name,
            department: '모바일사업부',
            created_at: new Date().toISOString(),
            mail: mail ?? '',
        };
        return this.currentUser;
    }

    async listUsers() {
        return this.currentUser ? [
            this.currentUser,
        ] : [
            {
                id: 'rndhkrndhk',
                name: "녹두로",
                department: '모바일사업부',
                created_at: "2008-01-14T04:33:35Z",
            },
            {
                id: 'qhals',
                name: "와우",
                department: '모바일사업부',
                created_at: "2008-01-14T04:33:35Z",
            },
            {
                id: 'J-dragon',
                name: "이재용",
                department: '삼성',
                created_at: "2008-01-14T04:33:35Z",
            },
            {
                id: 'applelove',
                name: "팀쿡",
                department: 'Apple',
                created_at: "2008-01-14T04:33:35Z",
            }
        ];
    }

    async updateUser(user: User) {
        this.currentUser = user;
        return this.currentUser;
    }
}