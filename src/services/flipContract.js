import Web3 from "web3"
import AgentFlip from "../compiled/AgentFlip.json";


const infuraRopstenUrl =
    "https://ropsten.infura.io/v3/b520d227f8e1479ab2bf09aebb9ea6db";

const web3 = new Web3(window.web3.currentProvider);
// const web3 = new Web3(new Web3.providers.HttpProvider(window.web3.currentProvider));

const AGENT_FLIP_ROPSTEN = "0x5C73e100B52a46CC603F9D4E37c1969C8B42De63"

async function FlipAgent(){
    return await new web3.eth.Contract(
        AgentFlip.abi,
        AGENT_FLIP_ROPSTEN
    );
}

export async function swapEthForSbtc(){
    const contr = await FlipAgent();

    const DEADLINE_FROM_NOW = 60 * 15;
    const deadline = Math.ceil(Date.now() / 1000) + DEADLINE_FROM_NOW;

    const receivedAmount = await contr.methods.swapEthForSbtc(deadline).send({
        value: web3.utils.toWei("0.1", "ether"),
        from: web3.eth.accounts.givenProvider.selectedAddress
    })

    console.log("received amt", receivedAmount);
}