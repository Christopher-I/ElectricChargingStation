import React from "react";
import { Modal, Button, Tab, Input, Table } from "semantic-ui-react";
import Web3 from "web3";
import ElectricCharginStationInstance from "../web3/ElectricCharginStationInstance";
const HDwalletProvider = require("truffle-hdwallet-provider");

let tab1Loading;
const electricRate = 1.5;
const contractAddress = "0x7EeD043fCfbe0a95897976C691A6F14B440d2407";
const amount = 200;

class PaymentPage extends React.Component {
	state = {
		paymentInETH: "",
		paymentInKWH: ""
	};
	componentDidMount() {
		tab1Loading = this.props.tab1Loading;
	}

	handleETHInput = e => {
		e.preventDefault();
		this.setState({
			paymentInETH: e.target.value,
			paymentInKWH: e.target.value * electricRate
		});
	};

	buyElectric = async e => {
		e.preventDefault();
		const electricCharginStationInstance = ElectricCharginStationInstance(
			contractAddress
		);
		const provider = new HDwalletProvider(
			"deliver kid very feature upon please tree robust common tail reward home",
			"https://rinkeby.infura.io/v3/c3085f6dbf9347358b5ab5d30de1fdbe"
		);
		let web3 = new Web3(provider);
		const accounts = await web3.eth.getAccounts();
		console.log(accounts);
		await electricCharginStationInstance.methods
			.createRequest(amount)
			.send({
				from: accounts[0]
			});
	};

	render() {
		return (
			<Modal
				open={this.props.openModal}
				onClose={this.props.closeModal}
				style={{ width: "900px", height: "600px" }}
			>
				<Modal.Header>
					Recharge Your Car Batteries with Crypto
				</Modal.Header>
				<Modal.Content>
					<h4 style={{ color: "grey" }}>
						{" "}
						Price: 1ETH = {electricRate} KW/hr{" "}
					</h4>
					<Tab
						menu={{ secondary: true, pointing: true }}
						loading={this.props.tab1Loading}
						style={{ width: "800px", height: "400px" }}
						panes={panes(this, this.state)}
					/>
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={this.props.closeModal} negative>
						Close
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}
export default PaymentPage;

function panes(self, state) {
	return [
		{
			menuItem: "Recharge",
			render: () => (
				<Tab.Pane
					menu={{ secondary: true, pointing: true }}
					loading={tab1Loading}
				>
					<h4> Enter the Amount in ETH you wish to buy </h4>
					<Input
						labelPosition="right"
						label={{ basic: true, content: "ETH" }}
						placeholder="ETH"
						onChange={self.handleETHInput}
						value={state.paymentInETH}
					/>

					<Input
						disabled
						style={{ marginLeft: "40px" }}
						labelPosition="right"
						label={{ basic: true, content: "KW/hr" }}
						placeholder="KW/hr"
						value={state.paymentInKWH}
					/>
					<Button
						basic
						color="green"
						onClick={self.buyElectric}
						style={{ marginLeft: "40px", width: "150px" }}
					>
						Checkout
					</Button>
				</Tab.Pane>
			)
		},
		{
			menuItem: "View Payment History",
			render: () => (
				<Tab.Pane attached={false}>
					<Table celled selectable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Name</Table.HeaderCell>
								<Table.HeaderCell>Status</Table.HeaderCell>
								<Table.HeaderCell>Notes</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row>
								<Table.Cell>John</Table.Cell>
								<Table.Cell>No Action</Table.Cell>
								<Table.Cell>None</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</Tab.Pane>
			)
		}
	];
}
