import * as rest from ".";

const userApi = new rest.UserAPI();

const testUser = {
    id: 'api-test',
    password: 'password',
    name: 'API 테스트 머신',
    department: '테스트부서',
    mail: '테스트@테스터.훈',
}

test("유저 리스트", async () => {
    const users = await userApi.listUsers();
    expect(users).toBeInstanceOf(Array);
    users.forEach(testIsUser);
});

test("회원 가입", async () => {
    await userApi.signup(testUser.id, testUser.password, testUser.name, testUser.department, testUser.mail);

    const users = await userApi.listUsers();
    expect(users.find(user => user.id === testUser.id)).toBeTruthy();
});

test("로그인", async () => {
    const user = await userApi.authUser(testUser.id, testUser.password);
    expect(user!.id).toBe(testUser.id);
});


function testIsUser(user: any) {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('department');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('mail');
}