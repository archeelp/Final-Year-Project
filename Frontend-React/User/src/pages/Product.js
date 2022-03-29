import Api from "../utils/Api/Api.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import SC from "../utils/smartContractUtil.js";
import { useNavigate } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import '../utils/products.json';
import Popup from "../components/Popup/Popup.js";
import AddProduct from "../components/AddProduct.js";
import EditProduct from "../components/EditProduct.js";

var products = [
	{
		"id": 1,

		"name": "Jersey",
		"image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
		"description": "premium quality",
		"cost": 40,
		"quantity": 40,
		"token": 5,
		"owner": "srushti"
	},
	{
		"id": 2,
		"name": "Shoes",
		"image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
		"description": "premium quality",
		"cost": 100,
		"quantity": 5,
		"token": 5,
		"owner": "srushti"
	},
	{
		"id": 5,
		"name": "Shoes",
		"image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
		"description": "premium quality",
		"cost": 100,
		"quantity": 5,
		"token": 5,
		"owner": "srushti"
	},
	{
		"id": 3,
		"name": "Shoes",
		"image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
		"description": "premium quality",
		"cost": 100,
		"quantity": 5,
		"token": 5,
		"owner": "srushti"
	},
	{
		"id": 4,
		"name": "Shoes",
		"image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
		"description": "premium quality",
		"cost": 100,
		"quantity": 5,
		"token": 5,
		"owner": "srushti"
	}
]

const Product = () => {
	const [tokens, setTokens] = useState([]);
	const [tokenProducts, setTokenProducts] = useState([]);
	//const [products, setProducts] = useState([]);
	let products=[];
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	window.ethereum.on("accountsChanged", () => {
		window.location.reload();
	});
	const [temp] = useState(localStorage.getItem("user"));
	var user = (JSON.parse(temp))
	useEffect(() => {
		const init = async () => {
			setIsLoading(true);
			console.log(user.token)
			if (user.token !== undefined) {
				try {
					const response = await Api.ProductApi.getProductsOf(user.token);
					let len=response.data.products[0].products.length;
					for(let i=0;i<len;i++)
					{
						products.push(response.data.products[0].products[i])
					}
					setIsLoading(false);
					setTokenProducts(products);
					console.log(products)
					// setTokenIndex(token.tokenIndex);
				} catch (error) {
					console.log(error);
				}
			}
			try {
				console.log(products)

			/*	const response = await Api.ProductApi.getProductsOf(user.token);
				let { products, message } = response.data;
					toast.update(toastElement, {
						render: message,
						type: "success",
						isLoading: false,
						autoClose: true,
					});
					tokens = tokens.filter((token) => token.tokenIndex !== undefined);
					SC.init()
						.then(async () => {
							const balances = await SC.getUserBalances(tokens);
							const adminBalances = await SC.getAdminBalances(tokens);
							setTokens(
								tokens.map((token, index) => {
									return {
										...token,
										balance: balances[index],
										raised: (token.amount - adminBalances[index]) * 100 / token.amount,
									};
								})
							);
							setIsLoading(false);
						})
						.catch((err) => {
							setIsLoading(false);
							console.log(err);
							toast.error("Can't connect to MetaMask");
						});*/

			} catch (error) {
				//responseErrorHandler(error, toastElement);
			}
		};
		return init();
	}, []);
	return isLoading ? (
		<Loader />
	) : (
		<>
			<div className="container px-0 py-10 mx-auto">
				<div className="flex flex-wrap -m-4">
					here are the products
					{tokenProducts.map((product) => {
						return (
							<div
								className="hover:animate-pulse xl:w-1/4 md:w-1/2 p-4"
								key={product._id}
								//onClick={() => navigate(`/marketplace/${token._id}`)}
							>
															<p>hi</p>

								<div className="bg-gray-100 p-6 rounded-lg">
									<img
										className="h-40 rounded w-full object-contain object-center mb-6"
										src={product.image}
										alt="content"
									/>
									<h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
										Product Name
									</h3>
									<h2 className="text-lg text-gray-900 font-medium title-font m-auto">
										{product.name?.toUpperCase()}
									</h2>
									<p className="mt-1 leading-relaxed text-base">
										{product.description}
									</p>
									<div className="flex m-auto">
										<CurrencyDollarIcon className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500 ml-4" />
										<span className="title-font font-medium text-sm text-gray-900 m-auto">
											{product.cost}  TOKEN
										</span>
									</div><br />
									<h2 className="text-lg text-gray-900 font-medium title-font m-auto">
										Quantity	{product.quantity}
									</h2>
									<Popup
										Button={<button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</button>}
										Modal={EditProduct}
										ProductId={product._id}
										ProductName={product.name}
										ProductCost={product.cost}
										ProductQuantity={product.quantity}
										ProductImage={product.image}
										ProductDescription={product.description}
									/>

								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Product;
