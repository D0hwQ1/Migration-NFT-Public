const Bridge = artifacts.require("Bridge");

module.exports = function (deployer) {
    deployer.deploy(Bridge, "0x11a8a575aff145d4fc50316f31568c069675bde8", "0x338D4632dD3c126719B5111B1333E473Fce454c6");
};
