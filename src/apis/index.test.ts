import { api, setLoggerFunction } from ".";
import { isPort, isPortRequest, isReviewedPortRequest, isScanReport, isScanTarget, isUser } from "../models/base";

function generateRandomString(): string {
    return Math.random().toString().slice(2, 10);
}

setLoggerFunction(x => x);

describe('/user', () => {

    const TEST_USER = {
        id: `api-${generateRandomString()}`,
        password: 'password',
        name: `api-at-${new Date().toLocaleTimeString()}`,
        department: '테스트부서',
        mail: '테스트@테스터.훈',
    }

    describe('/list', () => {

        test("사용자 목록이 배열인가", async () => {
            const users = await api.user.list();
            expect(users).toBeInstanceOf(Array);
        });

        test("사용자 목록이 비어있지 않은가", async () => {
            const users = await api.user.list();
            expect(users.length > 0).toBeTruthy();
        });

        test("사용자 목록의 요소가 모두 User 객체 형식인가", async () => {
            const users = await api.user.list();
            expect(users.every(isUser)).toBeTruthy();
        });
    });

    describe('/create', () => {

        test("고유한 계정이 잘 생성 되는가 (테스트 계정 생성)", async () => {
            const user = await api.user.create(
                TEST_USER.id,
                TEST_USER.password,
                TEST_USER.name,
                TEST_USER.department,
                TEST_USER.mail
            );
            expect(isUser(user)).toBeTruthy();
            expect(user!.id).toBe(TEST_USER.id);
            expect(user!.name).toBe(TEST_USER.name);
        });

        test("중복된 아이디로 계정을 생성할 시에 예외처리가 되는가", async () => {
            const oldUsers = await api.user.list();
            expect(oldUsers.length > 0).toBeTruthy();
            const oldUser = oldUsers[0];
            const newUser = await api.user.create(
                oldUser.id,
                TEST_USER.password,
                TEST_USER.name,
                TEST_USER.department,
                TEST_USER.mail
            );
            expect(newUser).toBe(undefined);
        });

        test("회원 가입 후 서버에 올바르게 적용되는가", async () => {
            const user = await api.user.get(TEST_USER.id);
            expect(isUser(user)).toBeTruthy();
            expect(user!.id).toBe(TEST_USER.id);
            expect(user!.name).toBe(TEST_USER.name);
        });
    });

    describe("/auth", () => {

        test("(테스트 계정으로) 로그인이 되는가", async () => {
            const user = await api.user.auth(TEST_USER.id, TEST_USER.password);
            expect(user!.id).toBe(TEST_USER.id);
        });

        test("잘못된 비밀번호로 로그인하면 실패하는가", async () => {
            const user = await api.user.auth(TEST_USER.id, generateRandomString());
            expect(user).toBe(undefined);
        });

        test("존재하지 않는 사용자 아이디로 로그인하면 실패하는가", async () => {
            const user = await api.user.auth(generateRandomString(), TEST_USER.password);
            expect(user).toBe(undefined);
        });
    });
});

describe("/port", () => {

    const TEST_PORT_REQUEST = {
        id: '',
        ip: "127.0.0.1",
        port: "80",
        usage: "사용목적"
    }

    describe("/list", () => {
        test("포트 목록이 배열인가", async () => {
            const ports = await api.port.list();
            expect(ports).toBeInstanceOf(Array);
        });

        test("포트 목록이 비어있지 않은가", async () => {
            const ports = await api.port.list();
            expect(ports.length > 0).toBeTruthy();
        });

        test("포트 목록의 요소가 포트 형식인가", async () => {
            const ports = await api.port.list();
            expect(ports.every(isPort)).toBeTruthy();
        });
    });

    describe("/open", () => {

        test("포트가 열리는 가", async () => {
            await api.port.open(TEST_PORT_REQUEST.ip, TEST_PORT_REQUEST.port);
        });

    });

    describe("/close", () => {

        test("포트가 닫히는 가", async () => {
            await api.port.close(TEST_PORT_REQUEST.ip, TEST_PORT_REQUEST.port);
        });

    });

    describe("/get", () => {

        test("포트가 열리는 가", async () => {
            await api.port.open(TEST_PORT_REQUEST.ip, TEST_PORT_REQUEST.port);
        });

        test("알려진 포트를 가져와보기", async () => {
            const port = await api.port.get(TEST_PORT_REQUEST.ip, TEST_PORT_REQUEST.port);
            expect(isPort(port)).toBeTruthy();
        });

    });

    describe('/request', () => {

        describe("/create", () => {

            test("새로운 요청을 생성할 수 있는가", async () => {
                const req = await api.port.request.create(
                    TEST_PORT_REQUEST.ip,
                    TEST_PORT_REQUEST.port,
                    TEST_PORT_REQUEST.usage
                );
                expect(isPortRequest(req)).toBeTruthy();
                TEST_PORT_REQUEST.id = req!.id;
            });

            test("새로운 요청이 제대로 추가되었는가", async () => {
                expect(TEST_PORT_REQUEST.id).toBeTruthy();
                const req = await api.port.request.get(TEST_PORT_REQUEST.id);
                expect(isPortRequest(req)).toBeTruthy();
                expect(req!.id).toBe(TEST_PORT_REQUEST.id);
                expect(req!.ip).toBe(TEST_PORT_REQUEST.ip);
                expect(req!.port).toBe(TEST_PORT_REQUEST.port);
            })

            test("새로운 요청이 목록에 나타나는가", async () => {
                const request = await api.port.request.list().then(arr => arr.find(x => x.ip === TEST_PORT_REQUEST.ip && x.port === TEST_PORT_REQUEST.port));
                expect(request).not.toBe(undefined);
            });

        });

        describe("/approve", () => {

            test("테스트용 요청 준비", async () => {
                const req = await api.port.request.create(
                    TEST_PORT_REQUEST.ip,
                    TEST_PORT_REQUEST.port,
                    `to test "/port/request/approve" at ${new Date().toLocaleString()}`
                );
                expect(isPortRequest(req)).toBeTruthy();
                TEST_PORT_REQUEST.id = req!.id;
            });

            test("테스트용 요청이 제대로 생성 되어있는가", async () => {
                const req = await api.port.request.get(TEST_PORT_REQUEST.id);
                expect(isPortRequest(req)).toBeTruthy();
            });

            test("포트 요청 승인이 되는가", async () => {
                await api.port.request.approve(TEST_PORT_REQUEST.id);
            });

            test("요청에 승인 관련 정보가 추가되었는가", async () => {
                const req = await api.port.request.get(TEST_PORT_REQUEST.id).then(p => p!);
                expect(isReviewedPortRequest(req)).toBeTruthy();
            });

            test("요청의 승인 여부가 올바른가", async () => {
                const req = await api.port.request.get(TEST_PORT_REQUEST.id).then(p => p!);
                expect(req.is_approved!).toBeTruthy();
            });

        });


        describe("/reject", () => {

            test("테스트용 요청 준비", async () => {
                const req = await api.port.request.create(
                    TEST_PORT_REQUEST.ip,
                    TEST_PORT_REQUEST.port,
                    `to test "/port/request/reject" at ${new Date().toLocaleString()}`
                );
                expect(isPortRequest(req)).toBeTruthy();
                TEST_PORT_REQUEST.id = req!.id;
            });

            test("테스트용 요청이 제대로 생성 되어있는가", async () => {
                const req = await api.port.request.get(TEST_PORT_REQUEST.id);
                expect(isPortRequest(req)).toBeTruthy();
            });

            test("포트 요청 거절이 되는가", async () => {
                await api.port.request.reject(TEST_PORT_REQUEST.id);
            });

            test("요청에 거절 관련 정보가 추가되었는가", async () => {
                const req = await api.port.request.get(TEST_PORT_REQUEST.id).then(p => p!);
                expect(isReviewedPortRequest(req)).toBeTruthy();
            });

            test("요청의 거절 여부가 올바른가", async () => {
                const req = await api.port.request.get(TEST_PORT_REQUEST.id).then(p => p!);
                expect(req.is_approved!).toBeFalsy();
            });

        });

    });

});

describe('/scan', () => {

    describe("/target", () => {

        describe("/list", () => {

            test("목록이 배열 형식인가", async () => {
                const targets = await api.scan.target.list();
                expect(targets).toBeInstanceOf(Array);
            });

            test("목록이 비어있지 않은가", async () => {
                const targets = await api.scan.target.list();
                expect(targets.length > 0).toBeTruthy();
            });

            test("목록의 요소가 스캔 타겟인가", async () => {
                const targets = await api.scan.target.list();
                expect(targets.every(isScanTarget)).toBeTruthy();
            });

        });

        describe("/create", () => {

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
            });

            test("서브넷 마스크를 포함하지 않은 스캔 대상을 추가할 수 있는가", async () => {
                const target = await api.scan.target.create(
                    TEST_TARGET_WO_SM.ip,
                    TEST_TARGET_WO_SM.subnet_mask
                );
                expect(isScanTarget(target)).toBeTruthy();
            });

        });

    });

    describe("/report", () => {

        describe("/list", () => {

            test("목록이 배열 형식인가", async () => {
                const reports = await api.scan.report.list();
                expect(reports).toBeInstanceOf(Array);
            });

            test("목록이 비어있지 않은가", async () => {
                const reports = await api.scan.report.list();
                expect(reports.length > 0).toBeTruthy();
            });

            test("목록의 요소가 스캔 리포트인가", async () => {
                const reports = await api.scan.report.list();
                expect(reports.every(isScanReport)).toBeTruthy();
            });

        });

        describe("/create", () => {

            test("즉시 스캔이 되는가", async () => {
                await api.scan.report.create();
            });

        });

        describe("/get", () => {

            test("목록이 비어있지 않은가", async () => {
                const reports = await api.scan.report.list();
                expect(reports.length > 0).toBeTruthy();
            });

            test("목록에 있는 요소를 개별적으로 가져올 수 있는가", async () => {
                const reportInList = await api.scan.report.list().then(reports => reports![0]);
                const report = await api.scan.report.get(reportInList.id);
                expect(isScanReport(report)).toBeTruthy();
                expect(report!.id).toBe(reportInList.id);
            });

        });

    });

});

describe("/monitoring", () => {

    test("라즈베리파이 모니터링 정보가 가져와지는가", async () => {
        const MachineStatus = await api.monitor();
        expect(MachineStatus).toHaveProperty('cpu');
        expect(MachineStatus).toHaveProperty('memory');
        expect(MachineStatus).toHaveProperty('disk');
        // expect(actual).toHaveProperty('network');
    });

});
