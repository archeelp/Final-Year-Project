import Api from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import React, { useEffect, useState } from "react";
import "../components/InputTag/InputTag.css"
import { oneETH } from "../constants"
import { toast } from "react-toastify"
import AddProduct from "../components/AddProduct"
import Product from "./Product"
import Popup from "../components/Popup/Popup.js";
var product = [
	{
		"name": "Jersey",
		"image": "dsfkslkf",
		"description": "premium quality",
		"cost": 40,
		"quantity": 40,
		"token": 5,
		"owner": "srushti"
	},
	{
		"name": "Shoes",
		"image": "dsfkslkf",
		"description": "premium quality",
		"cost": 100,
		"quantity": 5,
		"token": 5,
		"owner": "srushti"
	}
]

const Inventory = () => {
	window.ethereum.on("accountsChanged", () => {
		window.location.reload();
	});
	const [isLoading, setisLoading] = useState(true);
	const [temp] = useState(localStorage.getItem("user"));
	var user = (JSON.parse(temp))
	const { tokenID } = useState(user.token);

	useEffect(() => {
		const init = async () => {
			if (user.token !== undefined) {
				try {
					const response = await Api.token.getToken(user.token);
					const { token } = response.data;
					console.log(token);
					console.log(product)
					// setTokenIndex(token.tokenIndex);
				} catch (error) {
					console.log(error);
				}
			}
		};
		setisLoading(false)
		return init();
	}, [tokenID]);

	return isLoading ? (
		<Loader />
	) : (
		<>
			<section className="text-gray-600 body-font lg:mx-10 sm:mx-2">
				<div className="container px-5 py-24 mx-auto">
					<div className="lg:w-1/2 w-full mb-6 lg:mb-0"></div>
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
						Listed Product
					</h1>
					<div className="h-1 w-20 bg-indigo-500 rounded"></div>
					<Product />
					<Popup
						Button={<button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add New Product</button>}
						Modal={AddProduct}

					/>
				</div>
			</section >
		</>
	);
};

export default Inventory;
