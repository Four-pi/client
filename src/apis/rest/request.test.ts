import * as rest from ".";

const requestApi = new rest.RequestAPI();

const testRequest = {
    ip: 'test.domain',
    port: '80',
    usage: 'test-purpose'
}

test("새로운 포트 요청", async () => {
    await requestApi.createRequest(testRequest.ip, testRequest.port, testRequest.usage);

    let requests = await requestApi.listRequests();
    let myRequestOnServer = requests.find(req => req.ip === testRequest.ip && req.port === testRequest.port);
    expect(myRequestOnServer).not.toBe(undefined);
});

test("포트 요청 승인", async () => {
    await requestApi.createRequest(testRequest.ip, testRequest.port, testRequest.usage);

    let requests = await requestApi.listRequests();
    let myRequestOnServer = requests.find(req => req.ip === testRequest.ip && req.port === testRequest.port);
    expect(myRequestOnServer).not.toBe(undefined);

    await requestApi.approveRequest(myRequestOnServer!.id);

    requests = await requestApi.listRequests();
    myRequestOnServer = requests.find(req => req.ip === testRequest.ip && req.port === testRequest.port);
    expect(myRequestOnServer).not.toBe(undefined);

    expect(myRequestOnServer?.is_approved).toBeTruthy();
});

test("포트 요청 거절", async () => {
    const myRequest = {
        ip: 'test.domain',
        port: '80',
        usage: 'test-purpose'
    }
    await requestApi.createRequest(myRequest.ip, myRequest.port, myRequest.usage);

    let requests = await requestApi.listRequests();
    let myRequestOnServer = requests.find(req => req.ip === myRequest.ip && req.port === myRequest.port);
    expect(myRequestOnServer).not.toBe(undefined);

    await requestApi.approveRequest(myRequestOnServer!.id);

    requests = await requestApi.listRequests();
    myRequestOnServer = requests.find(req => req.ip === myRequest.ip && req.port === myRequest.port);
    expect(myRequestOnServer).not.toBe(undefined);

    expect(myRequestOnServer?.is_approved).toBeFalsy();
});
