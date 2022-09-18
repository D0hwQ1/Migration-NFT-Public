import React from "react";
import { Button, Box } from "@material-ui/core";
import { setKaikas } from "../klaytn/setKaikas";

const Header = () => {
    const { activate, active } = setKaikas();

    activate();

    return (
        <>
            <Box mx={2} mt={2} display="flex" justifyContent="flex-end">
                <Button
                    fullWidth={true}
                    color="inherit"
                    variant="outlined"
                    style={active ? { maxWidth: "9%", pointerEvents: "none" } : { maxWidth: "9%", cursor: "pointer" }}
                    onClick={() => {
                        activate();
                    }}
                >
                    {active ? "Connected" : "Connect Wallet"}
                </Button>
            </Box>
            <div>
                <img className="header" style={{ width: "60%" }} src={require("../images/image.png").default} />
            </div>
        </>
    );
};
export default Header;
