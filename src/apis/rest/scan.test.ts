import * as rest from ".";

const scanApi = new rest.ScanAPI();

test("스캔하려는 ip 리스트", async () => {
    const addressList = await scanApi.listScanTargets();
    expect(addressList).toBeInstanceOf(Array);
    addressList.forEach(testIsScanTarget);
});

test("스캔하려는 ip 추가", async () => {
    const myAddress = {
        ip: 'localhost',
        subnet_mask: '24'
    }
    await scanApi.addScanTarget(myAddress.ip, myAddress.subnet_mask);

    const addressList = await scanApi.listScanTargets();
    const myAddressOnServer = addressList.find(address => address.ip === myAddress.ip && address.subnet_mask === myAddress.subnet_mask);
    expect(addressList.length > 0).toBeTruthy();
    expect(myAddressOnServer).not.toBe(undefined);
});


function testIsScanTarget(user: any) {
    expect(user).toHaveProperty('ip');
    expect(user).toHaveProperty('subnet_mask');
}