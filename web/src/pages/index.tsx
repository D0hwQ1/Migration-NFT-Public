import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-ui/core";

import Layout from "../components/layout";
import SEO from "../components/seo";

import { setKaikas } from "../klaytn/setKaikas";

import Header from "../components/Header";

const IndexPage = () => {
    const { klaytn, active, activate, isEnableNetwork, checkNetwork } = setKaikas();
    
    useEffect(() => {
            activate();
            checkNetwork;

            if (klaytn) {
                if (isEnableNetwork != true) {
                    toast.error(`Wrong network! Please select to Cypress Mainnet`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                klaytn.on("accountsChanged", () => {
                    if (active) {
                        activate();
                    }
                });
                klaytn.on("networkChanged", () => {
                    checkNetwork;
                    if (isEnableNetwork != true) {
                        toast.error(`Wrong network! Please select to Baobab Testnet`, {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    if (active) {
                        activate();
                    }
                });
            } else {
                toast.error("Please install Klaytn Wallet", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }, []);

    const migration = async () => {
        toast(`서명창이 뜰 때까지 기다려주세요.`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        var res = await Migration(account);
        if (res == "no") {
            toast.error(`NFT를 소유하지 않으셨습니다.`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (res == false) {
            toast.error(`에러가 발생했습니다.`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.success(`NFT가 이전되었습니다.`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <Layout>
            <SEO title="Migration" />
            <ToastContainer />
            <Header></Header>
            <form className="card">
                <Button className="create-button" style={{ fontSize: "30px" }} variant="outlined" onClick={migration}>
                    Migration
                </Button>
            </form>
        </Layout>
    );
};

export default IndexPage;
