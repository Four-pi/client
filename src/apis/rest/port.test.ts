import * as rest from ".";

const portApi = new rest.PortAPI();

test("모든 포트 목록 보기", async () => {
    const ports = await portApi.listPorts();
    expect(ports).toBeInstanceOf(Array);
    ports.forEach(isPort);
});

test("지금 온라인인 포트 목록 보기", async () => {
    const ports = await portApi.getActivePorts();
    expect(ports).toBeInstanceOf(Array);
    ports.forEach(isPort);
});

test("포트를 사용가능한 상태로 변경", async () => {
    await portApi.open('localhost', '80');
});

test("포트를 사용 불가능한 상태로 변경", async () => {
    await portApi.close('localhost', '80');
});

function isPort(x: any) {
    expect(x).toHaveProperty('ip');
    expect(x).toHaveProperty('subnet_mask');
    expect(x).toHaveProperty('is_open');
}