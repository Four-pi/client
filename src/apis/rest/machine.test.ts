import * as rest from ".";

const machineStatusApi = new rest.MachineStatusAPI();

test("라즈베리파이 사용률", async () => {
    const actual = await machineStatusApi.monitor();
    expect(actual).toHaveProperty('cpu');
    expect(actual).toHaveProperty('memory');
    expect(actual).toHaveProperty('disk');
    // expect(actual).toHaveProperty('network');
});