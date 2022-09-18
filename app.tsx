const Caver = require("caver-js");
const kip17 = require(__dirname + "/build/contracts/KIP17Token.json");
const bridge = require(__dirname + "/build/contracts/Bridge.json");
const caver = new Caver("https://public-node-api.klaytnapi.com/v1/cypress");

var wallet = {
    _address: "",
    _key: "",
};

const config = require(__dirname + "/truffle-config");
wallet = caver.wallet.keyring.create(caver.klay.accounts.privateKeyToAccount(config.MAINNET_PRIVATE_KEY).address, config.MAINNET_PRIVATE_KEY);
caver.wallet.add(wallet);

var origin = new caver.kct.kip17("0x11a8a575aff145d4fc50316f31568c069675bde8");
var latest = new caver.contract(kip17.abi, kip17.networks[8217].address);
var contract2 = new caver.contract(bridge.abi, bridge.networks[8217].address);
(async () => {
    // var res = await latest.methods.addMinter(bridge.networks[8217].address).send({
    //     from: wallet._address,
    //     gas: 4000000,
    // });
    // console.log(res);
    // var res = await origin.setApprovalForAll(bridge.networks[8217].address, true, {
    //     from: wallet._address,
    //     gas: 4000000,
    // });
    // console.log(res);
    var res = await latest.methods.setApprovalForAll(bridge.networks[8217].address, true).send({
        from: wallet._address,
        gas: 4000000,
    });
    console.log(res);
    // var res = await contract2.methods.migrationForOwner([2]).send({
    //     from: wallet._address,
    //     gas: 4000000,
    // });
    // console.log(res);
})();
