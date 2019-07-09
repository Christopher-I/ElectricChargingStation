import Web3 from "web3";

import ElectricChargingStationInstance from "./build/ElectricChargingStation.json";
const HDwalletProvider = require("truffle-hdwallet-provider");

export default address => {
	const provider = new HDwalletProvider(
		"deliver kid very feature upon please tree robust common tail reward home",
		"https://rinkeby.infura.io/v3/c3085f6dbf9347358b5ab5d30de1fdbe"
	);
	let web3 = new Web3(provider);
	return new web3.eth.Contract(
		JSON.parse(ElectricChargingStationInstance.interface),
		address
	);
};
