import React from "react";
import { Modal, Button, Tab, Input, Table, Card } from "semantic-ui-react";
import Web3 from "web3";
import ElectricCharginStationInstance from "../web3/ElectricCharginStationInstance";
import RequestCoreInstance from "../web3/RequestCoreInstance";
const HDwalletProvider = require("truffle-hdwallet-provider");

let tab1Loading;
const electricRate = 1.5;
const contractAddress = "0x7EeD043fCfbe0a95897976C691A6F14B440d2407";
const contractAddressRequestCore = "0x967c269f373652fc7a4ef70df7781b509fa4f117";
const amount = 200;
const provider = new HDwalletProvider(
	"deliver kid very feature upon please tree robust common tail reward home",
	"https://rinkeby.infura.io/v3/c3085f6dbf9347358b5ab5d30de1fdbe"
);
let web3 = new Web3(provider);
const electricCharginStationInstance = ElectricCharginStationInstance(
	contractAddress
);
const requestCoreInstance = RequestCoreInstance(contractAddress);

class PaymentPage extends React.Component {
	state = {
		paymentInETH: "",
		paymentInKWH: "",
		createdRequests: "",
		requestDetails: [],
		showInvoice: false,
		createInvoiceLoadingButton: false,
		accceptInvoiceLoadingButton: false,
		reqID: "",
		errMessage: "",
		numberOfRequest: ""
	};
	componentDidMount() {
		this.updateRequestDetails();

		tab1Loading = this.props.tab1Loading;
	}
	async updateRequestDetails() {
		const requestCoreInstance = RequestCoreInstance(
			contractAddressRequestCore
		);
		const accounts = await web3.eth.getAccounts();
		// console.log(accounts);
		const getRequestDetails = [];
		let createdRequests = this.props.data.createds;

		for (let i = 0; i < createdRequests.length; i++) {
			getRequestDetails.push(
				await requestCoreInstance.methods
					.getRequest(createdRequests[i].requestId)
					.call()
			);
		}

		await (this.setState({
			requestDetails: await getRequestDetails,
			numberOfRequest: createdRequests.length
		}),
		this.populateTransactionHistory());
	}

	handleETHInput = e => {
		e.preventDefault();
		this.setState({
			paymentInETH: e.target.value,
			paymentInKWH: e.target.value * electricRate
		});
	};

	printResult = e => {
		e.preventDefault();
		// console.log(this.state.requestDetails);
	};

	populateTransactionHistory() {
		//console.log(this.state.requestDetails);
		let createdRequests = this.props.data.createds;
		let list = this.state.requestDetails.map(request => {
			// console.log(request);
			return (
				<Table.Row>
					<Table.Cell>12-12-12</Table.Cell>
					<Table.Cell>{request.payeeAddr}</Table.Cell>
					<Table.Cell>{request.payeeExpectedAmount / 1}</Table.Cell>
					{request.state == 0 ? (
						<Table.Cell>Pending</Table.Cell>
					) : (
						<Table.Cell>Accepted</Table.Cell>
					)}
				</Table.Row>
			);
		});

		this.setState({
			createdRequests: list
		});
	}

	acceptInvoice = async e => {
		this.props.closeModal(e);
	};

	createInvoice = async e => {
		e.preventDefault();
		this.setState({
			createInvoiceLoadingButton: true
		});

		try {
			const accounts = await web3.eth.getAccounts();

			await electricCharginStationInstance.methods
				.createRequest(this.state.paymentInETH)
				.send({
					from: accounts[0],
					gas: "2700000"
				});
		} catch (err) {
			this.setState({ errorMessage: err.message });
			console.log("there was an error" + err.message);
		}

		this.setState({
			showInvoice: true,
			createInvoiceLoadingButton: false
		});
	};

	render() {
		return (
			<Modal
				open={this.props.openModal}
				onClose={this.props.closeModal}
				style={{ width: "1300px", height: "1000px" }}
			>
				<Modal.Header>
					Recharge Your Car Batteries with Crypto
				</Modal.Header>
				<Modal.Content>
					<h4 style={{ color: "teal" }}>
						{" "}
						Price: 1ETH = {electricRate} KW/hr{" "}
					</h4>
					<Tab
						menu={{ secondary: true, pointing: true }}
						loading={this.props.tab1Loading}
						panes={panes(this, this.state, this.props)}
					/>
				</Modal.Content>

				<Modal.Content />

				<Modal.Actions>
					<Button
						floated="left"
						style={{ width: "150px" }}
						onClick={this.props.closeModal}
						negative
					>
						Close
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}
export default PaymentPage;

function panes(self, state, props) {
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
						floated="right"
						basic
						color="green"
						loading={state.createInvoiceLoadingButton}
						onClick={self.createInvoice}
						style={{ marginLeft: "40px", width: "150px" }}
					>
						Checkout
					</Button>
					{state.showInvoice && (
						<Card style={{ height: "350px", width: "auto" }}>
							<Card.Content>
								<Card.Header>Invoice</Card.Header>
								<Card.Meta>Recharge Car Batteries</Card.Meta>
								<Card.Description>
									Electric Station Account Number :
									"0xc582ec7fb245c6e55bd26b7f968ef5028218ac3b"
								</Card.Description>
								<Card.Description>
									Quanity : {state.paymentInKWH}
								</Card.Description>
								<Card.Description>
									Cost : {state.paymentInETH}ETH
								</Card.Description>
								<Button
									loading={state.accceptInvoiceLoadingButton}
									onClick={self.acceptInvoice}
									floated="right"
									style={{ width: "150px" }}
									primary
								>
									Accept Invoice and Pay
								</Button>
							</Card.Content>
						</Card>
					)}
				</Tab.Pane>
			)
		},
		{
			menuItem: "Invoice History",
			render: () => (
				<Tab.Pane attached={false}>
					<Table celled selectable>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Date</Table.HeaderCell>

								<Table.HeaderCell>
									Electric Station Account
								</Table.HeaderCell>
								<Table.HeaderCell>Amount(ETH)</Table.HeaderCell>
								<Table.HeaderCell>Status</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>{state.createdRequests}</Table.Body>
					</Table>
				</Tab.Pane>
			)
		},
		{
			menuItem: "Stats",
			render: () => (
				<Tab.Pane attached={false}>
					<div>
						{" "}
						You have made a total of {state.numberOfRequest}{" "}
						electrics payments
					</div>
				</Tab.Pane>
			)
		}
	];
}
