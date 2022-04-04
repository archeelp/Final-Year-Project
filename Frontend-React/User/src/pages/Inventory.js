import Api from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import React, { useEffect, useState } from "react";
import "../components/InputTag/InputTag.css";
// import { oneETH } from "../constants"
import { responseErrorHandler } from "../utils/Api/Api.js";
import { toast } from "react-toastify";
import AddProduct from "../components/AddProduct";
import Product from "../components/Product";
import Popup from "../components/Popup/Popup.js";

const Inventory = () => {
	window.ethereum.on("accountsChanged", () => {
		window.location.reload();
	});
	const [allproducts, setAllProducts] = useState([]);
	const [isLoading, setisLoading] = useState(true);
	const [temp] = useState(localStorage.getItem("user"));
	var user = JSON.parse(temp);
	const tokenId = user.token;

	useEffect(() => {
		const init = async () => {
			const toastElement = toast.loading("Fetching Products");
			if (user.token !== undefined) {
				try {
					const response = await Api.ProductApi.getProductsOf(tokenId);
					// console.log("products hai=", response.data.products[0].products);
					const message = response.data.message;
					const products = response.data.products[0].products;
					setAllProducts(products);
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
						Products listed under your Token
					</h1>
					<div className="h-1 w-20 bg-indigo-500 rounded"></div>
					<div className="container px-0 py-10 mx-auto">
						<div className="flex flex-wrap -m-4">
							{allproducts.map((product) => {
								return <Product product={product} key={product._id} setProducts={setAllProducts} products={allproducts} />;
							})}
						</div>
					</div>
					<Popup
						Button={
							<button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Add New Product
							</button>
						}
						Modal={AddProduct}
						setProducts={setAllProducts} products={allproducts}
					/>
				</div>
			</section>
		</>
	);
};

export default Inventory;
