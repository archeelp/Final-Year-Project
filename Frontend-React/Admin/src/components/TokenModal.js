import React from "react";
import {
	LocationMarkerIcon,
	DeviceMobileIcon,
	AtSymbolIcon,
	BadgeCheckIcon,
} from "@heroicons/react/outline";
import Popup from "./Popup/Popup";
import { oneETH } from "../constants";

const Modal = ({ close, ...props }) => {
	const token = props;

	return (
		<div className="bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0 modal">
			<h2 className="text-gray-900 text-lg text-center font-medium title-font">
				TOKEN DETAILS
			</h2>
			<div className="flex flex-wrap -m-auto">
				<div className="xl:w-2/5 md:w-2/5 p-4">
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
						<div className="flex mb-4">
							<h3 className="text-l font-medium flex items-center text-indigo-600">
								1 {token.name?.toUpperCase()} TOKEN = {token.rate / oneETH} ETH
							</h3>
						</div>
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
					</div>
				</div>
				<div className="xl:w-3/5 md:w-3/5 p-4">
					<div className="bg-gray-100 p-6 rounded-lg grid grid-cols-2">
						<div className="sm:-ml-10 ">
							<div className="rounded-full bg-gray-200 p-2 border-0 flex flex-row">
								<AtSymbolIcon className="rounded-full w-6 h-6 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500" />
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
								<BadgeCheckIcon className="rounded-full w-6 h-6 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500" />
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
								<LocationMarkerIcon className="rounded-full w-6 h-6 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500" />
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
											<li>{awardsAndAccolade}</li>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<button
				onClick={() => close()}
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
