const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(
	__dirname,
	"contracts",
	"ElectricChargingStation.sol"
);
const campaignPath2 = path.resolve(__dirname, "contracts", "RequestCore.sol");

const source = fs.readFileSync(campaignPath, "utf8");
const source2 = fs.readFileSync(campaignPath2, "utf8");
const output = solc.compile(source, 1).contracts;
const output2 = solc.compile(source2, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract.replace(":", "") + ".json"),
		output[contract]
	);
}

for (let contract in output2) {
	fs.outputJsonSync(
		path.resolve(buildPath, contract.replace(":", "") + ".json"),
		output[contract]
	);
}
