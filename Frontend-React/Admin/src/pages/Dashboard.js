import Api from "../utils/Api/Api.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import SC from "../utils/smartContractUtil.js";
// import { useNavigate } from "react-router-dom";
import TokenModel from "../components/TokenModal.js";
import { CurrencyDollarIcon } from "@heroicons/react/outline";

const Marketplace = () => {
	const [allTokenRequests, setTokenRequests] = useState([]);
	const [approvedTokens, setApprovedTokens] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [approvedToken, setApprovedToken] = useState({});
	// const navigate = useNavigate();
	window.ethereum.on("accountsChanged", () => {
		window.location.reload();
	});

	useEffect(() => {
		const init = async () => {
			const toastElement = toast.loading("Fetching Tokens");
			try {
				const tokenRequestsResponse = await Api.token.getTokenRequests();
				const { tokenRequests, message } = tokenRequestsResponse.data;
				console.log(tokenRequests);
				toast.update(toastElement, {
					render: message,
					type: "success",
					isLoading: false,
					autoClose: true,
				});
				const approvedTokensResponse = await Api.token.getApprovedTokens();
				const { approvedTokens, approvedMessage } = approvedTokensResponse.data;
				console.log(approvedTokens);
				toast(approvedMessage, {
					render: approvedMessage,
					type: "success",
					isLoading: false,
					autoClose: true,
				});
				setIsLoading(false);
				SC.init()
					.then(async () => {
						setTokenRequests(
							tokenRequests.map((token, index) => {
								return {
									...token,
								};
							})
						);
						setApprovedTokens(
							approvedTokens.map((token, index) => {
								return {
									...token,
								};
							})
						);
						toast.info("Connected to Metamask!");
					})
					.catch((err) => {
						console.log(err);
						toast.error("Can't connect to MetaMask");
					});
			} catch (error) {
				responseErrorHandler(error, toastElement);
			}
		};
		return init();
	}, []);

	const approveToken = async (tokenAdmin, amount, rate, tokenID) => {
		const toastElement = toast.loading("Approving Token");
		try {
			await SC.approveToken(tokenAdmin, amount, rate);
			const { proposedToken, message } = await Api.token.approveToken(tokenID);
			setApprovedToken(proposedToken);
			toast.update(toastElement, {
				render: "Token Approved Successfully",
				type: "success",
				isLoading: false,
				autoClose: true,
			});
			setIsLoading(false);
			window.location.reload();
		} catch (error) {
			responseErrorHandler(error, toastElement);
		}
	};

	return isLoading ? (
		<Loader />
	) : (
		<section className="text-gray-600 body-font lg:mx-10 sm:mx-2">
			<div className="container px-5 py-12 mx-auto">
				<div className="flex flex-wrap w-full mb-20">
					<div className="lg:w-1/2 w-full mb-6 lg:mb-0">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
							View Token Requests
						</h1>
						<div className="h-1 w-20 bg-indigo-500 rounded"></div>
					</div>
					<p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
						The following tokens are requested for Admin approval
					</p>
				</div>
				<div className="flex flex-wrap -m-4">
					{allTokenRequests.map((token) => {
						return (
							<div
								className="hover:animate-pulse xl:w-1/4 md:w-1/2 p-4"
								key={token._id}
								// onClick={() => navigate(`/marketplace/${token._id}`)}
							>
								<div className="bg-gray-100 p-6 rounded-lg">
									<img
										className="h-32 rounded w-full object-contain object-center mb-6"
										src={token.image}
										alt="content"
									/>
									<h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
										Token Name
									</h3>
									<h2 className="text-lg text-gray-900 font-medium title-font m-auto">
										{token.name?.toUpperCase()} TOKEN
									</h2>
									{token.approved && (
										<div className="flex mb-1 w-50">
											<span className="flex items-center">
												Percent Raised 25%
												<div className="w-40 bg-gray-200 h-2 ml-2">
													<div
														className="bg-indigo-600 h-2"
														style={{ width: "25%" }}
													></div>
												</div>
											</span>
										</div>
									)}
									<div className="grid grid-cols-2">
										<button
											onClick={() =>
												approveToken(
													token.ethereumAddress,
													token.amount,
													token.rate,
													token._id
												)
											}
											className="mt-6 mb-6 flex m-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
										>
											Approve
										</button>
										{/* <button className="mt-6 mb-6 flex m-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
											View Details
										</button> */}
										<TokenModel {...token}></TokenModel>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="container px-5 py-12 mx-auto">
				<div className="flex flex-wrap w-full mb-20">
					<div className="lg:w-1/2 w-full mb-6 lg:mb-0">
						<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
							View Approved Tokens
						</h1>
						<div className="h-1 w-20 bg-indigo-500 rounded"></div>
					</div>
					<p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
						The following tokens are Approved by the Admin
					</p>
				</div>
				<div className="flex flex-wrap -m-4">
					{approvedTokens.map((token) => {
						return (
							<div
								className="hover:animate-pulse xl:w-1/4 md:w-1/2 p-4"
								key={token._id}
								// onClick={() => navigate(`/marketplace/${token._id}`)}
							>
								<div className="bg-gray-100 p-6 rounded-lg">
									<img
										className="h-32 rounded w-full object-contain object-center mb-6"
										src={token.image}
										alt="content"
									/>
									<h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
										Token Name
									</h3>
									<h2 className="text-lg text-gray-900 font-medium title-font m-auto">
										{token.name?.toUpperCase()} TOKEN
									</h2>
									<div className="flex mb-1 w-50">
										<span className="flex items-center">
											Percent Raised 25%
											<div className="w-40 bg-gray-200 h-2 ml-2">
												<div
													className="bg-indigo-600 h-2"
													style={{ width: "25%" }}
												></div>
											</div>
										</span>
									</div>
									<div className="flex m-auto">
										<CurrencyDollarIcon className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500 ml-4" />
										<span className="title-font font-medium text-sm text-gray-900 m-auto">
											Balance {token.balance} {token.name?.toUpperCase()} TOKEN
										</span>
									</div>
									{/* <button className="mt-6 mb-6 flex m-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
										View Details
									</button> */}
									<TokenModel
										className={
											"mt-6 mb-6 flex m-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
										}
										{...token}
									></TokenModel>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Marketplace;
