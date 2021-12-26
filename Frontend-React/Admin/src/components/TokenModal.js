import React from "react";
import { responseErrorHandler } from "../utils/Api/Api";
import { toast } from "react-toastify";
import {
	CurrencyDollarIcon,
	DeviceMobileIcon,
	InboxInIcon,
} from "@heroicons/react/outline";
// import validator from "validator";
import Popup from "./Popup/Popup";
// import Input from "./Input";
// import Radio from "./Radio";

const Modal = ({ close, ...props }) => {
	const token = props;
	console.log(token);
	const toastElement = toast.loading("Loading Token details");
	const submit = async () => {
		try {
			return close();
		} catch (error) {
			responseErrorHandler(error, toastElement);
		}
	};
	toast.update(toastElement, {
		autoClose: true,
		render: "Token details viewed succesfully",
		type: "success",
		isLoading: false,
	});

	return (
		<div className="bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-3/5 mt-10 md:mt-0 modal">
			<h2 className="text-gray-900 text-lg text-center font-medium title-font">
				TOKEN DETAILS
			</h2>
			<div className="flex flex-wrap -m-auto">
				<div className="xl:w-1/2 md:w-1/2 p-4">
					<div className="bg-gray-100 p-6 rounded-lg">
						<img
							className="h-50 rounded w-full object-contain object-center mb-6"
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
					</div>
				</div>
				<div className="xl:w-1/2 md:w-1/2 p-4">
					<div className="bg-gray-100 p-6 rounded-lg grid grid-cols-2">
						<div className="sm:-ml-10 ">
							<div className="rounded-full bg-gray-200 p-2 border-0 flex flex-row">
								<InboxInIcon className="rounded-full w-6 h-6 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500" />
								<h3 className="tracking-widest text-indigo-500 text-md font-medium title-font">
									Email:
								</h3>
								<h2 className="text-md text-gray-900 font-medium title-font m-auto">
									{token.email}
								</h2>
							</div>
						</div>
						<div>
							<div className="rounded-full bg-gray-200 p-2 border-0 flex flex-row">
								<DeviceMobileIcon className="rounded-full w-6 h-6 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500" />
								<h3 className="tracking-widest text-indigo-500 text-md font-medium title-font">
									Mobile
								</h3>
								<h2 className="text-md text-gray-900 font-medium title-font m-auto">
									{token.mobile}
								</h2>
							</div>
						</div>
					</div>
					<div className="bg-gray-100 px-6 rounded-lg grid grid-cols-2">
						<div className="sm:-ml-10 ">
							<div className="rounded-full bg-gray-200 p-2 border-0 flex flex-row">
								<InboxInIcon className="rounded-full w-6 h-6 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500" />
								<h3 className="tracking-widest text-indigo-500 text-md font-medium title-font">
									Level:
								</h3>
								<h2 className="text-md text-gray-900 font-medium title-font m-auto">
									{token.degreeOfPlay}
								</h2>
							</div>
						</div>
						<div>
							<div className="rounded-full bg-gray-200 p-2 border-0 flex flex-row">
								<DeviceMobileIcon className="rounded-full w-6 h-6 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500" />
								<h3 className="tracking-widest text-indigo-500 text-md font-medium title-font">
									Country:
								</h3>
								<h2 className="text-md text-gray-900 font-medium title-font m-auto">
									{token.country}
								</h2>
							</div>
						</div>
					</div>
					<div className="bg-gray-200 mt-4 sm:-ml-10 text-center justify-center">
						<h3 className="tracking-widest text-indigo-500 text-md font-medium title-font">
							Certificates
						</h3>
						<div className="flex flex-wrap overflow-x-scroll justify-center">
							{token.certificates.map((certificate) => {
								return (
									<div className="hover:animate-pulse xl:w-2/6 md:w-2/6">
										<div className="p-2 rounded-lg">
											<img
												className="rounded w-full object-contain object-center"
												src={certificate}
												alt="content"
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="bg-gray-200 mt-4 sm:-ml-10 text-center justify-center">
						<h3 className="tracking-widest text-indigo-500 text-md font-medium title-font">
							Awards and Accolades
						</h3>
						<div className="flex flex-wrap overflow-x-scroll justify-center">
							{token.awardsAndAccolades.map((awardsAndAccolade) => {
								return (
									<div className="hover:animate-pulse xl:w-2/6 md:w-2/6">
										<div className="p-2 rounded-lg">
											<img
												className="rounded w-full object-contain object-center"
												src={awardsAndAccolade}
												alt="content"
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<button
				onClick={submit}
				className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
			>
				Close
			</button>
		</div>
	);
};

const TokenModal = ({ className, ...props }) => {
	return (
		<Popup
			Button={<button className={className}>View Details</button>}
			Modal={Modal}
			{...props}
		/>
	);
};

export default TokenModal;
