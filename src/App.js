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
import HDwalletProvider from "truffle-hdwallet-provider";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient, { gql, InMemoryCache } from "apollo-boost";

const contractAddress = "0x7EeD043fCfbe0a95897976C691A6F14B440d2407";
const amount = 200;

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
	throw new Error(
		"REACT_APP_GRAPHQL_ENDPOINT environment variable not defined"
	);
}

const client = new ApolloClient({
	uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
	cache: new InMemoryCache()
});

const GRAVATARS_QUERY = gql`
	query General($first: Int = 5) {
		createds(first: 5) {
			id
			requestId
			payee
			payer
		}
	}
`;

class App extends React.Component {
	state = {
		modalOpen: false,
		tab1Loading: false
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
			<ApolloProvider client={client}>
				<Container style={{ width: "1300px", marginTop: "100px" }}>
					<Query query={GRAVATARS_QUERY}>
						{({ data, error, loading }) => {
							return loading ? (
								<h1>Loading</h1>
							) : error ? (
								<h1>Error </h1>
							) : (
								<PaymentPage
									data={data}
									openModal={this.state.modalOpen}
									closeModal={this.closeModal}
									tab1Loading={this.state.tab1Loading}
								/>
							);
						}}
					</Query>

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
								<Card
									style={{ height: "350px", width: "290px" }}
								>
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
			</ApolloProvider>
		);
	}
}

export default App;
