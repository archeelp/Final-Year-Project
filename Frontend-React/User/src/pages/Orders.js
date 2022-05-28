import Api from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import React, { useEffect, useState } from "react";
import "../components/InputTag/InputTag.css";
// import { oneETH } from "../constants"
import { responseErrorHandler } from "../utils/Api/Api.js";
import { toast } from "react-toastify";

const Inventory = () => {
	window.ethereum.on("accountsChanged", () => {
		window.location.reload();
	});
	const [orders, setOrders] = useState([]);
	const [isLoading, setisLoading] = useState(true);
	const [temp] = useState(localStorage.getItem("user"));
	var user = JSON.parse(temp);
	const tokenId = user.token;

	useEffect(() => {
		const init = async () => {
			const toastElement = toast.loading("Fetching Orders");
			if (user.token !== undefined) {
				try {
					const response = await Api.ProductApi.getOrders();
					console.log("orders hai=", response.data.orders);
					const message = response.data.message;
					const orders = response.data.orders;
					setOrders(orders);
					toast.update(toastElement, {
						render: message,
						type: "success",
						isLoading: false,
						autoClose: true,
					});
					setisLoading(false);
				} catch (error) {
					responseErrorHandler(error, toastElement);
					console.log(error);
				}
			}
		};
		return init();
	}, []);

	return isLoading ? (
		<Loader />
	) : (
		<>
			<section className="text-gray-600 body-font lg:mx-10 sm:mx-2">
				<div className="container px-5 py-24 mx-auto">
					<div className="lg:w-1/2 w-full mb-6 lg:mb-0"></div>
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
						Your orders
					</h1>
					<table class=" border-separate border border-slate-400 table-fixed">
						<thead>
							<tr>
								<th className="border border-slate-300">Product ID</th>
								<th className="border border-slate-300">Name</th>
								<th className="border border-slate-300">Address</th>
								<th className="border border-slate-300">Mobile Number</th>
								<th className="border border-slate-300">Email</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => {
								return (
									<tr className="border border-slate-300">
										<td className="border border-slate-300 px-2 text-center">
											{order.productId}
										</td>
										<td className="border border-slate-300 px-2 text-center">
											{order.name}
										</td>
										<td className="border border-slate-300 px-2 text-center">
											{order.address}
										</td>
										<td className="border border-slate-300 px-2 text-center">
											{order.mobileNumber}
										</td>
										<td className="border border-slate-300 px-2 text-center">
											{order.email}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
};

export default Inventory;
