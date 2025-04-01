import React, { useEffect, useState } from "react";
import Web3 from "web3";
import CoffeeShopABI from "./abi/CoffeeShop.json";
import BuyItem from "./components/BuyItem";
import OrderHistory from "./components/OrderHistory";
import RateItem from "./components/RateItem";

const CONTRACT_ADDRESS = '0xcedC1d441f7f8c1BBE457a9b46a5630930c04D65';

export default function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();

        const accounts = await web3Instance.eth.getAccounts();
        const coffeeShop = new web3Instance.eth.Contract(
          CoffeeShopABI.abi,
          CONTRACT_ADDRESS
        );

        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setContract(coffeeShop);
      } else {
        alert("Please install MetaMask to use this app");
      }
    };
    init();
  }, []);

  if (!web3 || !contract || !account) return <div>Loading Web3, account, and contract...</div>;

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">☕ CoffeeShop DApp</h1>
      <p className="mb-4">Connected as: <strong>{account}</strong></p>

      <div className="grid gap-6">
        <BuyItem account={account} contract={contract} web3={web3} />
        <OrderHistory account={account} contract={contract} />
        <RateItem account={account} contract={contract} />
      </div>
    </div>
  );
}
