import Web3 from "web3";
import DNSStorageBuild from "contracts/DNS_Storage.json";

let isInitialized = false;
let dnsStorage;
let userAddress;

let selectedAccount;

export const init = async () => {
  let provider = window.ethereum;
  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        localStorage.setItem("selected_amount", selectedAccount);
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
      });
    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      localStorage.setItem("selected_amount", selectedAccount);
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  dnsStorage = new web3.eth.Contract(
    DNSStorageBuild.abi,
    DNSStorageBuild.networks[networkId].address
  );
  isInitialized = true;
  userAddress = "0xdf667a90e5c74f957270e5e7673669a09a46a4a0";
};

export const regName = async () => {
  if (!isInitialized) {
    await init();
  }

  return await dnsStorage.methods
    .registerName(userAddress, "Sahil")
    .send({ from: selectedAccount });
};

export const assgnName = async () => {
  if (!isInitialized) {
    await init();
  }
  return await dnsStorage.methods
    .assignName("Sahil", userAddress)
    .send({ from: selectedAccount });
};

export const getDomainName = async (address) => {
  if (!isInitialized) {
    await init();
  }
  return await dnsStorage.methods.getName(address).call();
};

export const getAddress = async (domainName) => {
  if (!isInitialized) {
    await init();
  }
  return await dnsStorage.methods.getAddressUsingNameHash(domainName).call();
};
