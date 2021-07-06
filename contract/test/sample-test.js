const { expect } = require("chai");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const IotexApiGatewayBadge = await hre.ethers.getContractFactory("IotexApiGatewayBadge");
    const iotexApiGatewayBridge = await IotexApiGatewayBadge.deploy();

    await iotexApiGatewayBridge.deployed();

    // Uptime99Percent 0xb4214cd6B2CF82Eed431e0e679aB242c797dd91D https://api.iotex.one
    console.log("Greeter deployed to:", iotexApiGatewayBridge.address);

    await iotexApiGatewayBridge
      .mintBadge('Uptime99Percent', '0xb4214cd6B2CF82Eed431e0e679aB242c797dd91D', 'https://api.iotex.one');

    const nodeBadges = await iotexApiGatewayBridge
      .getNodeBadges(['https://api.iotex.one']);

    console.log(nodeBadges);

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
