import { api, setLogger } from ".";
import { MachineStatus, Port, Request, ScanTarget, User, isReport, isScanTarget } from "../models/base";

function generateRandomString(length: number = 25): string {
    const start = 2;
    const end = start + length;
    return Math.random().toString().slice(start, end);
}

function createUniqueUser() {
    return {
        id: `api-${generateRandomString()}`,
        password: 'password',
        name: `api-at-${new Date().toLocaleTimeString()}`,
        department: '테스트부서',
        mail: '테스트@테스터.훈',
    };
}

beforeAll(() => {
    setLogger(x => x);
})

describe('user.create()', () => {
    let userToCreate = createUniqueUser();

    beforeEach(() => {
        userToCreate = createUniqueUser();
    })

    test("API 서버가 응답하는지 검사", async () => {
        await api.user.create(userToCreate.id, userToCreate.password, userToCreate.name, userToCreate.department, userToCreate.mail);
    })


    describe("계정 생성에 성공하는 경우", () => {

        describe("모든 정보를 기입하여 새로운 계정을 생성하는 경우", () => {
            let userToCreate = createUniqueUser();
            let userToCreateAt = new Date(Date.now());
            let createdUser: User;

            beforeAll(async () => {
                const _userCreated = await api.user.create(userToCreate.id, userToCreate.password, userToCreate.name, userToCreate.department, userToCreate.mail);
                if (_userCreated === undefined) throw Error();
                createdUser = _userCreated;
            })

            test("반환된 값의 자료형 검사", () => {
                expect(createdUser).toEqual({
                    id: expect.any(String),
                    name: expect.any(String),
                    department: expect.any(String),
                    created_at: expect.any(String),
                    mail: expect.any(String)
                })
            })

            test("반환된 값이 생성시 사용한 사용자 정보와 일치", () => {
                const { id, name, department, mail } = userToCreate;
                expect(createdUser).toMatchObject({ id, name, department, mail })
            })

            test("반환된 값의 created_at 이 나타내는 시간 검사", () => {
                const delayedFor = new Date(createdUser.created_at).getTime() - userToCreateAt.getTime();
                expect(delayedFor).toBeLessThan(5000);
            })

            test("user.get() 으로 조회 가능한지 검사", async () => {
                const user = await api.user.get(createdUser.id);
                expect(user).toEqual(createdUser);
            })

            test("user.list() 에 포함되어 있는지 검사", async () => {
                const users = await api.user.list();
                expect(users).toContainEqual(createdUser);
            })

        })

        describe("이메일이 없이 새로운 계정을 생성하는 경우", () => {
            let userToCreate = createUniqueUser();
            let createdUser: User;

            beforeAll(async () => {
                const _userCreated = await api.user.create(userToCreate.id, userToCreate.password, userToCreate.name, userToCreate.department);
                if (_userCreated === undefined) throw Error();
                createdUser = _userCreated;
            })

            test("반환된 값의 자료형이 올바른지 검사", () => {
                expect(createdUser).toEqual({
                    id: expect.any(String),
                    name: expect.any(String),
                    department: expect.any(String),
                    created_at: expect.any(String),
                    mail: undefined
                })
            })

            test("반환된 값이 생성시 사용한 사용자 정보와 일치하는지 검사", () => {
                expect(createdUser).toMatchObject({
                    id: userToCreate.id,
                    name: userToCreate.name,
                    department: userToCreate.department,
                    mail: undefined,
                })
            })

        })

    })

    describe("계정 생성에 실패하는 경우", () => {

        test("중복된 아이디로 계정 생성", async () => {
            await api.user.create(userToCreate.id, userToCreate.password, userToCreate.name, userToCreate.department, userToCreate.mail);
            const duplicatedUser = await api.user.create(userToCreate.id, userToCreate.password, userToCreate.name, userToCreate.department, userToCreate.mail);
            expect(duplicatedUser).toBeUndefined();
        })

        test.todo("길이 25 이상의 아이디 값으로 계성");

})

})

describe('user.get()', () => {

    test("API 서버가 응답하는지 검사", async () => {
        await api.user.get(generateRandomString());
    })

    describe("존재하는 사용자 정보를 가져오는 경우", () => {

        let knwonUser: User;
        let foundUser: User;

        beforeAll(async () => {
            const userToCreate = createUniqueUser();
            const _createdUser = await api.user.create(userToCreate.id, userToCreate.password, userToCreate.name, userToCreate.department, userToCreate.mail);
            knwonUser = _createdUser!;
            const _foundUser = await api.user.get(knwonUser.id);
            foundUser = _foundUser!;
        })

        test("반환된 값의 자료형이 올바른지 검사", async () => {
            expect(foundUser).toEqual({
                id: expect.any(String),
                name: expect.any(String),
                department: expect.any(String),
                created_at: expect.any(String),
                mail: expect.any(String),
            })
        })

        test("반환된 값의 정보가 일치하는지 검사", async () => {
            expect(foundUser).toEqual(knwonUser);
        })

    })

    test.todo("존재하지 않는 사용자 정보를 가져오는 경우");

})

describe('user.list()', () => {

    test("API 서버가 응답하는지 검사", async () => {
        await api.user.list();
    })

    describe('불러온 사용자 목록에 대해', () => {

        let users: User[];

        beforeAll(async () => {
            users = await api.user.list();
        })

        test("반환값이 올바른 자료형을 갖고있는가", async () => {
            expect(users).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    department: expect.any(String),
                    created_at: expect.any(String),
                })
            ]));
        })

    })
})

describe("user.auth()", () => {
    let userToCreate = createUniqueUser();
    let createdUser: User;

    beforeAll(async () => {
        const _createdUser = await api.user.create(userToCreate.id, userToCreate.password, userToCreate.name, userToCreate.department, userToCreate.mail);
        if (_createdUser === undefined) throw Error();
        createdUser = _createdUser;
    })

    test("API 서버가 응답하는지 검사", async () => {
        await api.user.auth(generateRandomString(), generateRandomString());
    })

    describe("로그인에 성공하는 경우", () => {
        let authenticatedUser: User;

        beforeAll(async () => {
            const _authenticatedUser = await api.user.auth(userToCreate.id, userToCreate.password);
            authenticatedUser = _authenticatedUser!;
        })

        test("반환값이 존재하는지 검사", () => {
            expect(authenticatedUser).toBeDefined();
        })

        test("반환된 사용자 정보가 로그인시 사용한 정보와 동일한가", () => {
            expect(authenticatedUser).toEqual(createdUser);
        })

    })

    describe("로그인에 실패하는 경우", () => {

        test("존재하지 않는 사용자 아이디를 입력했을 경우", async () => {
            const user = await api.user.auth(generateRandomString(), userToCreate.password);
            expect(user).toBe(undefined);
        })

        test("잘못된 비밀번호를 입력했을 경우", async () => {
            const user = await api.user.auth(userToCreate.id, generateRandomString());
            expect(user).toBe(undefined);
        })

    })
})

describe("port.get()", () => {

    let createdPort: Port;

    beforeAll(async () => {
        const portToCreate = {
            ip: "127.0.0.1",
            port: "8080"
        };
        const _createdPort = await api.port.open(portToCreate.ip, portToCreate.port);
        if (!_createdPort) throw Error();
        createdPort = _createdPort;
    })

    test("API 서버가 응답하는지 검사", async () => {
        await api.port.get(createdPort.ip, createdPort.port);
    })

    describe("가져온 포트의 정보가", () => {

        let foundPort: Port;

        beforeAll(async () => {
            const _gottenPort = await api.port.get(createdPort.ip, createdPort.port);
            if (!_gottenPort) throw Error();
            foundPort = _gottenPort;
        })

        test("올바른 자료형을 갖고있는가", () => {
            expect(foundPort).toEqual({
                ip: expect.any(String),
                port: expect.any(String),
                is_open: expect.any(Boolean),
            })
        })

        test("생성한 포트의 정보와 일치하는가", () => {
            expect(foundPort).toEqual(createdPort);
        })

    })

})

describe("port.list()", () => {

    test("API 서버가 응답하는지 검사", async () => {
        await api.port.list();
    })

    describe("포트 목록이", () => {

        let ports: Port[];

        beforeAll(async () => {
            ports = await api.port.list();
        })

        test("올바른 자료형을 갖고있는가", () => {
            expect(ports).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    ip: expect.any(String),
                    port: expect.any(String),
                    is_open: expect.any(Boolean),
                })
            ]));
        })

    })
})

describe("port.open()", () => {

    const portToTest = {
        ip: "127.0.0.1",
        port: "8080"
    };

    test("API 서버가 응답하는지 검사", async () => {
        await api.port.open(portToTest.ip, portToTest.port);
    })

    describe("포트를 열었을 때", () => {

        let openedPort: Port;

        beforeAll(async () => {
            const _openedPort = await api.port.open(portToTest.ip, portToTest.port);
            openedPort = _openedPort!;
        })

        test("반환된 값이 있는가", () => {
            expect(openedPort).toBeDefined();
        })

        test("반환된 정보가 올바른 자료형을 갖고 있는가", () => {
            expect(openedPort).toEqual({
                ip: expect.any(String),
                port: expect.any(String),
                is_open: expect.any(Boolean),
            })
        })

        test("반환된 정보가 올바른 ip, port 값을 포함하는가", () => {
            expect(openedPort).toMatchObject(portToTest);
        })

        test("반환된 정보가 열린 포트로 표시되어있는가", () => {
            expect(openedPort.is_open).toBeTruthy();
        })

    })

})

describe("port.close()", () => {

    const portToTest = {
        ip: "127.0.0.1",
        port: "8080"
    };

    test("API 서버가 응답하는지 검사", async () => {
        await api.port.close(portToTest.ip, portToTest.port);
    })

    describe("포트를 닫았을 때", () => {

        let closedPort: Port;

        beforeAll(async () => {
            const _closedPort = await api.port.close(portToTest.ip, portToTest.port);
            closedPort = _closedPort!;
        })

        test("반환된 값이 있는가", () => {
            expect(closedPort).toBeDefined();
        })

        test("반환된 정보가 올바른 자료형을 갖고 있는가", () => {
            expect(closedPort).toMatchObject({
                ip: expect.any(String),
                port: expect.any(String),
                is_open: expect.any(Boolean),
            })
        })

        test("반환된 정보가 올바른 ip, port 값을 포함하는가", async () => {
            expect(closedPort).toMatchObject(portToTest);
        })

        test("반환된 정보가 닫힌 포트로 표시되어있는가", async () => {
            expect(closedPort.is_open).toBeFalsy();
        })

    })

})

describe("port.request.create()", () => {

    const requestToCreate = {
        ip: '127.0.0.1',
        port: '8000',
        usage: 'test-purpose'
    };
    let currentUser: User;

    test("API 서버가 응답하는지 검사", async () => {
        // 요청 생성 전에 로그인부터.
        const user = createUniqueUser();
        await api.user.create(user.id, user.password, user.name, user.department, user.mail);
        const _currentUser = await api.user.auth(user.id, user.password);
        currentUser = _currentUser!;

        await api.port.request.create(requestToCreate.ip, requestToCreate.port, requestToCreate.usage);
    })

    describe("요청을 생성했을 때", () => {

        let createdRequest: Request;

        beforeAll(async () => {
            const _requestCreated = await api.port.request.create(requestToCreate.ip, requestToCreate.port, requestToCreate.usage);
            createdRequest = _requestCreated!;
        })

        test("반환된 값이 있는가", () => {
            expect(createdRequest).toBeDefined();
        })

        test("반환 값에서 사용자를 제외한 반환 값의 자료형이 올바른가", () => {
            expect(createdRequest).toMatchObject({
                id: expect.any(String),
                created_at: expect.any(String),
                ip: expect.any(String),
                port: expect.any(String),
                usage: expect.any(String),
            })
        })

        test("반환 값에서 사용자에 대한 반환 값의 자료형이 올바른가", () => {
            expect(createdRequest.created_by).toMatchObject({
                id: expect.any(String),
                name: expect.any(String),
                department: expect.any(String),
                created_at: expect.any(String),
            })
        })

        test("반환된 요청 객체의 사용자 정보가 일치하는가", () => {
            expect(createdRequest.created_by.id).toBe(currentUser.id);
        })

        test("port.request.get() 에서 해당 요청을 찾을 수 있는가", async () => {
            const foundRequest = await api.port.request.get(createdRequest.id);
            expect(foundRequest).toMatchObject({
                id: expect.any(String),
            });
        })

        test("port.request.list() 에서 해당 요청을 찾을 수 있는가", async () => {
            const requests = await api.port.request.list();
            expect(requests).toContainEqual(createdRequest);
        })

    })

})

describe("port.request.list()", () => {

    test("API 서버가 응답하는지 검사", async () => {
        await api.port.request.list();
    })

    describe("받아온 요청 목록이", () => {

        let requests: Request[];

        beforeAll(async () => {
            requests = await api.port.request.list();
        })

        test("올바른 자료형을 갖고있는가", async () => {
            expect(requests).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    created_at: expect.any(String),
                    created_by: {
                        id: expect.any(String),
                        name: expect.any(String),
                        department: expect.any(String),
                        created_at: expect.any(String),
                    },
                    ip: expect.any(String),
                    port: expect.any(String),
                    usage: expect.any(String),
                })
            ]));
        })

    })

})

describe("port.request.approve()", () => {

    let createdRequest: Request;
    let currentUser: User;

    beforeAll(async () => {
        const userToCreate = createUniqueUser();
        const requestToCreate = {
            ip: '127.0.0.1',
            port: '8000',
            usage: `test-at-${new Date().toLocaleTimeString()}`
        };
        await api.user.create(userToCreate.id, userToCreate.password, userToCreate.name, userToCreate.department, userToCreate.mail);
        const _currentUser = await api.user.auth(userToCreate.id, userToCreate.password);
        currentUser = _currentUser!;
        const _createdRequest = await api.port.request.create(requestToCreate.ip, requestToCreate.port, requestToCreate.usage);
        createdRequest = _createdRequest!;
    })

    test("API 서버가 응답하는지 검사", async () => {
        await api.port.request.approve(createdRequest.id);
    })

    describe("요청을 처리했을 때", () => {
        let createdRequest: Request;
        let reviewedRequest: Request;

        beforeAll(async () => {
            const requestToCreate = {
                ip: '127.0.0.1',
                port: '8001',
                usage: `test-at-${new Date().toLocaleTimeString()}`
            };
            const _createdRequest = await api.port.request.create(requestToCreate.ip, requestToCreate.port, requestToCreate.usage);
            createdRequest = _createdRequest!;
            const _reviewedRequest = await api.port.request.approve(createdRequest.id);
            reviewedRequest = _reviewedRequest!;
        })

        test("반환 값에서 사용자를 제외한 반환 값의 자료형이 올바른가", () => {
            expect(reviewedRequest).toMatchObject({
                id: expect.any(String),
                created_at: expect.any(String),
                ip: expect.any(String),
                port: expect.any(String),
                usage: expect.any(String),
                reviewed_at: expect.any(String),
                is_approved: expect.any(Boolean),
            })
        })

        test("반환 값에서 사용자에 대한 반환 값의 자료형이 올바른가", () => {
            const userMatcher = {
                id: expect.any(String),
                name: expect.any(String),
                department: expect.any(String),
                created_at: expect.any(String),
            };
            expect(reviewedRequest.created_by).toMatchObject(userMatcher);
            expect(reviewedRequest.reviewed_by).toMatchObject(userMatcher);
        })

        test("반환 값에서 요청을 처리한 사용자에 대한 정보가 올바른가", () => {
            expect(reviewedRequest.reviewed_by!.id).toBe(currentUser.id);
        })

        test("반환 값에서 처리 되었음으로 표시되는가", () => {
            expect(reviewedRequest.is_approved).toBeTruthy();
        })

    })

})

describe("port.request.reject()", () => {

    let createdRequest: Request;
    let currentUser: User;

    beforeAll(async () => {
        const userToCreate = createUniqueUser();
        const requestToCreate = {
            ip: '127.0.0.1',
            port: '8000',
            usage: `test-at-${new Date().toLocaleTimeString()}`
        };
        await api.user.create(userToCreate.id, userToCreate.password, userToCreate.name, userToCreate.department, userToCreate.mail);
        const _currentUser = await api.user.auth(userToCreate.id, userToCreate.password);
        currentUser = _currentUser!;
        const _createdRequest = await api.port.request.create(requestToCreate.ip, requestToCreate.port, requestToCreate.usage);
        createdRequest = _createdRequest!;
    })

    test("API 서버가 응답하는지 검사", async () => {
        await api.port.request.reject(createdRequest.id);
    })

    describe("요청을 처리했을 때", () => {
        let createdRequest: Request;
        let reviewedRequest: Request;

        beforeAll(async () => {
            const requestToCreate = {
                ip: '127.0.0.1',
                port: '8001',
                usage: `test-at-${new Date().toLocaleTimeString()}`
            };
            const _createdRequest = await api.port.request.create(requestToCreate.ip, requestToCreate.port, requestToCreate.usage);
            createdRequest = _createdRequest!;
            const _reviewedRequest = await api.port.request.reject(createdRequest.id);
            reviewedRequest = _reviewedRequest!;
        })

        test("반환 값에서 사용자를 제외한 반환 값의 자료형이 올바른가", () => {
            expect(reviewedRequest).toMatchObject({
                id: expect.any(String),
                created_at: expect.any(String),
                ip: expect.any(String),
                port: expect.any(String),
                usage: expect.any(String),
                reviewed_at: expect.any(String),
                is_approved: expect.any(Boolean),
            })
        })

        test("반환 값에서 사용자에 대한 반환 값의 자료형이 올바른가", () => {
            const userMatcher = {
                id: expect.any(String),
                name: expect.any(String),
                department: expect.any(String),
                created_at: expect.any(String),
            };
            expect(reviewedRequest.created_by).toMatchObject(userMatcher);
            expect(reviewedRequest.reviewed_by).toMatchObject(userMatcher);
        })

        test("반환 값에서 요청을 처리한 사용자에 대한 정보가 올바른가", () => {
            expect(reviewedRequest.reviewed_by!.id).toBe(currentUser.id);
        })

        test("반환 값에서 처리 되었음으로 표시되는가", () => {
            expect(reviewedRequest.is_approved).toBeFalsy();
        })

    })

})

const scanTargetMatcher = {
    ip: expect.any(String),
    // subnet_mask: expect.any(String),
}


describe("scan.target.create()", () => {

    test("API 서버가 응답하는지 검사", async () => {
        await api.scan.target.create(generateRandomString(), undefined);
    })

    describe("타겟을 추가했을경우", () => {

        const sampleScanTarget: ScanTarget = {
            ip: generateRandomString(),
            subnet_mask: '24',
        }

        describe("서브넷 마스크를 포함하는 경우", () => {

        })

        describe("서브넷 마스크를 포함하지 않는 경우", () => {

        })

    })

    const TEST_TARGET_WO_SM = {
        ip: 'test.host',
        subnet_mask: undefined,
    }

    const TEST_TARGET_W_SM = {
        ...TEST_TARGET_WO_SM,
        subnet_mask: '24'
    }

    test("서브넷 마스크를 포함한 스캔 대상을 추가할 수 있는가", async () => {
        const target = await api.scan.target.create(
            TEST_TARGET_W_SM.ip,
            TEST_TARGET_W_SM.subnet_mask
        );
        expect(isScanTarget(target)).toBeTruthy();
    })

    test("서브넷 마스크를 포함하지 않은 스캔 대상을 추가할 수 있는가", async () => {
        const target = await api.scan.target.create(
            TEST_TARGET_WO_SM.ip,
            TEST_TARGET_WO_SM.subnet_mask
        );
        expect(isScanTarget(target)).toBeTruthy();
    })

})

describe("scan.target.list()", () => {

    test("API 서버가 응답하는지 검사", async () => {
        await api.scan.target.list();
    })

    describe("올바르게 목록이 불러진 경우", () => {

        let list: ScanTarget[];

        beforeAll(async () => {
            list = await api.scan.target.list();
        })

        test("배열을 반환하는지 검사", () => {
            expect(list).toBeInstanceOf(Array);
        })

        test("배열 원소들의 자료형이 올바른지 검사", () => {
            list.forEach(value => expect(value).toMatchObject(scanTargetMatcher));
        })

    })

})

describe("scan.report.create()", () => {

    test("즉시 스캔이 되는가", async () => {
        try {
            await api.scan.report.create();
        } catch (e) {
            console.log(e);
        }
    })

})

describe("scan.report.get()", () => {

    test("목록이 비어있지 않은가", async () => {
        const reports = await api.scan.report.list();
        expect(reports.length > 0).toBeTruthy();
    })

    test("목록에 있는 요소를 개별적으로 가져올 수 있는가", async () => {
        const reportInList = await api.scan.report.list().then(reports => reports![0]);
        const report = await api.scan.report.get(reportInList.id);
        expect(isReport(report)).toBeTruthy();
        expect(report!.id).toBe(reportInList.id);
    })

})

describe("scan.report.list()", () => {

    test("목록이 배열 형식인가", async () => {
        const reports = await api.scan.report.list();
        expect(reports).toBeInstanceOf(Array);
    })

    test("목록이 비어있지 않은가", async () => {
        const reports = await api.scan.report.list();
        expect(reports.length > 0).toBeTruthy();
    })

    test("목록의 요소가 스캔 리포트인가", async () => {
        const reports = await api.scan.report.list();
        expect(reports.every(isReport)).toBeTruthy();
    })

})

describe("monitoring()", () => {

    describe("조회한 모니터링 정보에서", () => {

        let status: MachineStatus;

        beforeAll(async () => {
            status = await api.monitor();
        })

        test("값의 자료형이 올바른가", () => {
            expect(status).toEqual({
                cpu: expect.any(Number),
                memory: expect.any(Number),
                disk: expect.any(Number),
                network: expect.any(Number),
            })
        })

        test("값의 범위가 올바른가 (0.0 ~ 1.0)", () => {
            expect(status.cpu).toBeCloseTo(0.5, 0);
            expect(status.memory).toBeCloseTo(0.5, 0);
            expect(status.disk).toBeCloseTo(0.5, 0);
            expect(status.network).toBeCloseTo(0.5, 0);
        })
    })

})
