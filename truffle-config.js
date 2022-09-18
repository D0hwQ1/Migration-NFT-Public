const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const MAINNET_PRIVATE_KEY = "";

module.exports = {
    MAINNET_PRIVATE_KEY,
    networks: {
        cypress: {
            provider: () => new HDWalletProvider(MAINNET_PRIVATE_KEY, "https://public-node-api.klaytnapi.com/v1/cypress"),
            network_id: "8217",
            gas: 6000000,
            gasPrice: null,
        },
    },

    compilers: {
        solc: {
            version: "^0.5.6",
            settings: {
                // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: true,
                    runs: 999999
                },
                evmVersion: "istanbul",
                outputSelection: {
                    "*": {
                        "": ["ast"],
                        "*": [
                            "evm.bytecode.object",
                            "evm.deployedBytecode.object",
                            "abi",
                            "evm.bytecode.sourceMap",
                            "evm.deployedBytecode.sourceMap",
                            "metadata",
                        ],
                    },
                },
            },
        },
    },
};
