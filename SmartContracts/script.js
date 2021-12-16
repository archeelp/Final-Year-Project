let web3, eth, accounts, contract, decimals;

const contractAddress = "0x546Ded752612B9170da9c39e41Da892E1C3ee8F1";

const getWeb3 = () => {
    return new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
            eth = window.ethereum;
            if (eth) {
                web3 = new Web3(eth);
                try {
                    accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    resolve(web3);
                } catch (error) {
                    reject(error);
                }
            } else {
                reject("must install MetaMask");
            }
        });
    });
};

const getContract = async (web3) => {
    const data = await $.getJSON("./build/contracts/MyToken.json");

    const netId = await web3.eth.net.getId();
    const deployedNetwork = data.networks[netId];
    const contract = new web3.eth.Contract(
        data.abi,
        deployedNetwork && deployedNetwork.address
    );

    return contract;
};

const mint = async () => {
    const recipient = $("#mint-recipient")[0].value;
    const amount = Number($("#mint-amount")[0].value);
    await contract.methods
        .mint(recipient, BigInt(amount * 10 ** decimals))
        .send({ from: accounts[0], gas: 400000 });
    updateTotalSupply();
    updateBalance();
};

const buy = async () => {
    const amount = $("#eth-cost")[0].textContent;
    await contract.methods.buy().send({
        from: accounts[0],
        gasPrice: web3.utils.toHex(20000000000),
        gas: web3.utils.toHex(60000),
        value: web3.utils.toHex(web3.utils.toWei(amount, "ether")),
    });
    updateBalance();
};

const createToken = async () => {
  return await contract.methods.addNewToken(accounts[0],10,"1000000000000000000").send({ from: accounts[0], gas: 400000 });
}

async function init() {
    await getWeb3();
    contract = await getContract(web3);
    res = await contract.methods.getTokenInfo("0").call();
    console.log(res);
    eth.on("accountsChanged", (new_accounts) => {
        accounts = new_accounts;
    });
}

init();