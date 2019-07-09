import React from "react";
import {
	Grid,
	Image,
	Container,
	Icon,
	Card,
	Menu,
	Divider,
	Modal,
	Button
} from "semantic-ui-react";

import PaymentPage from "./components/paymentPage";

import image1 from "./images/1.png";
import image2 from "./images/2.jpg";
import image11 from "./images/11.png";
import image4 from "./images/4.jpg";
import image12 from "./images/12.png";
import image14 from "./images/14.jpg";
import image6 from "./images/6.jpg";
import image5 from "./images/5.jpg";
import image15 from "./images/15.jpg";
import req from "./images/payWithRequest.jpg";
import Web3 from "web3";
import ElectricCharginStationInstance from "./web3/ElectricCharginStationInstance";
const HDwalletProvider = require("truffle-hdwallet-provider");

const contractAddress = "0x7EeD043fCfbe0a95897976C691A6F14B440d2407";
const amount = 200;

class App extends React.Component {
	state = {
		modalOpen: false,
		tab1Loading: false
	};

	createRequest = async event => {
		event.preventDefault();
		const electricCharginStationInstance = ElectricCharginStationInstance(
			contractAddress
		);
		//we are on the server or the user is not running metamask
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

	openModal = e => {
		e.preventDefault();
		this.setState({
			modalOpen: true
		});
	};

	closeModal = e => {
		e.preventDefault();
		console.log("closing modal");
		this.setState({
			modalOpen: false
		});
	};

	render() {
		return (
			<Container style={{ width: "1300px", marginTop: "100px" }}>
				<Button onClick={this.createRequest}> Create request </Button>
				<PaymentPage
					openModal={this.state.modalOpen}
					closeModal={this.closeModal}
					tab1Loading={this.state.tab1Loading}
				/>
				<h2 style={{ color: "grey" }}>
					{" "}
					Pay with Crypto at Electric Charging Stations{" "}
				</h2>
				<Divider style={{ width: "520px" }} />
				<Grid>
					<Grid.Row>
						<Image src={image2} size="large" rounded />

						<Image
							rounded
							src={image4}
							size="large"
							style={{ marginLeft: "50px" }}
						/>

						<Grid.Row style={{ marginLeft: "50px" }}>
							<Card style={{ height: "350px", width: "290px" }}>
								<Card.Content>
									<Image
										src={image11}
										size="small"
										verticalAlign="top"
										circular
									/>
									<Icon
										name="plus"
										size="huge"
										style={{
											marginTop: "120px",
											marginLeft: "20px"
										}}
									/>
									<Image
										src={image12}
										size="small"
										circular
										style={{ marginTop: "-10px" }}
									/>
								</Card.Content>
							</Card>

							<Card
								onClick={this.openModal}
								style={{ height: "350px", width: "290px" }}
							>
								<Card.Content>
									<Image
										href="/"
										src={req}
										circular
										style={{ marginTop: "10px" }}
									/>
								</Card.Content>
							</Card>
						</Grid.Row>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

export default App;
