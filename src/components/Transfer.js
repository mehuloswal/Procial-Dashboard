import { useState } from "react";
import Web3 from "web3";
import { getDomainName, regName, assgnName, getAddress } from "../web3client";
import "./Transfer.scss";
export default function Transfer() {
  const [input, setInput] = useState("");
  const [domainName, setDomainName] = useState("");
  const [address, setAddress] = useState("");
  const [displayAddr, setDisplayAddr] = useState(false);
  async function transfer(e) {
    e.preventDefault();
    let selectedAccount = localStorage.getItem("selected_amount");
    let destAddress;
    if (Web3.utils.checkAddressChecksum(input)) {
      destAddress = input;
    } else if (Web3.utils.checkAddressChecksum(address)) {
      destAddress = address;
    } else {
      alert("Error");
    }
    const transactionParameters = {
      // gas: Number(21000).toString(16), // customizable by user during MetaMask confirmation.

      to: destAddress, // Required except during contract publications.
      from: selectedAccount, // must match user's active address.
      value: Number(1000000000000000000).toString(16), // Only required to send ether to the recipient from the initiating external account.
    };
    await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
      .then((tx) => {
        alert("Transaction Done Successfully! ");
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("submitting");
  }
  const name = async (e) => {
    e.preventDefault();
    // console.log(destAddr);
    const userName = await getDomainName(input);
    setDomainName(userName);
    // console.log("blah");
  };
  const setMappings = () => {
    regName()
      .then((tx) => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
    assgnName()
      .then((tx) => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnChange = async (e) => {
    setInput(e.target.value);
    const temp = await getAddress(e.target.value);
    if (temp !== "0x0000000000000000000000000000000000000000") {
      setDisplayAddr(true);
      setAddress(temp);
    } else {
      setDisplayAddr(false);
    }
  };

  return (
    <div className="outer">
      <div className="inner">
        <form onSubmit={transfer}>
          <input onChange={(e) => handleOnChange(e)} type="text" />
          {displayAddr ? address : ""}
          <button onClick={setMappings}> Register Names Auto</button>
          <button onClick={name}>Get Name</button>
          DomainName : {domainName}
          <button onClick={transfer} type="submit">
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
}
