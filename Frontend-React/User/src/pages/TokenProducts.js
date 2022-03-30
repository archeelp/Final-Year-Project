import Api from "../utils/Api/Api.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import Product from "../components/Product";
import { useParams } from "react-router-dom";

const TokenProducts = () => {
	const [allproducts, setAllProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { tokenId } = useParams();
	const navigate = useNavigate();
	window.ethereum.on("accountsChanged", () => {
		window.location.reload();
	});

	useEffect(() => {
		const init = async () => {
			const toastElement = toast.loading("Fetching Products");
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
				setIsLoading(false);
			} catch (error) {
				responseErrorHandler(error, toastElement);
			}
		};
		return init();
	}, []);

	return isLoading ? (
		<Loader />
	) : (
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
							return <Product product={product} key={product._id} />;
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TokenProducts;
