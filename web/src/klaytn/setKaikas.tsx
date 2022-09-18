import { useCallback, useEffect, useMemo, useState } from "react";
import Caver from "caver-js";
declare global {
    interface Window {
        klaytn: any;
    }
}

export function setKaikas() {
    const Bridge = require("../../../build/contracts/Bridge.json");
    const KIP17 = require("../../../build/contracts/KIP17Token.json");

    const { klaytn }: any = typeof window !== "undefined" ? window : "https://public-node-api.klaytnapi.com/v1/cypress";
    const [account, setAccount] = useState(null);
    const [caver, setCaver] = useState<any>(new Caver(klaytn));
    const [active, setActive] = useState(false);
    const [isEnableNetwork, setIsEnableNetwork] = useState(true);
    const [err, setErr] = useState(false);

    useEffect(() => {
        if (klaytn) {
            setCaver(new Caver(klaytn));
        }
    }, []);

    const activate = useCallback(async () => {
        if (klaytn) {
            try {
                await klaytn.enable();
            } catch (e) {
                throw e;
            }
            await new Promise(resolve => {
                setTimeout(resolve, 200);
            });
            await setAccountInfo(klaytn);
            setActive(true);
        }
    }, [klaytn]);

    const setAccountInfo = useCallback(async klaytn => {
        const account = klaytn.selectedAddress;
        setAccount(account);
    }, []);

    const checkNetwork = useCallback(async klaytn => {
        if (klaytn.networkVersion.toString() !== "8217") {
            setIsEnableNetwork(false);
        } else {
            setIsEnableNetwork(true);
        }
    }, []);

    const Migration = async (account: any) => {
        var origin = new caver.klay.KIP17("0x11a8a575aff145d4fc50316f31568c069675bde8");
        const contract = new caver.klay.Contract(Bridge.abi, Bridge.networks[8217].address);
        console.log(contract.address)

        try {
            var tmp = await origin.isApprovedForAll(account, Bridge.networks[8217].address);

            if (!tmp) {
                var res = await origin.setApprovalForAll(Bridge.networks[8217].address, true, { from: account, gas: 250000 });
            }

            var total = parseInt(await origin.balanceOf(account))
            if(total <= 0) {
                return "no"
            }

            var tokenId = []
            var res = await contract.methods.migration().send({
                from: account,
                gas: total > 150 ? 70000000 : 10000000
            });
            console.log(res);

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    const key = useMemo(
        () => ({
            klaytn,
            account,
            caver,
            active,
            activate,
            isEnableNetwork,
            checkNetwork,
            Migration,
        }),
        [klaytn, account, caver, active, activate, isEnableNetwork, checkNetwork, Migration]
    );

    return { ...key };
}
