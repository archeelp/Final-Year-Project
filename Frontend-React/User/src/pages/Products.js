import Api from "../utils/Api/Api.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import "../utils/products.json";
import Product from "../components/Product.js";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	window.ethereum.on("accountsChanged", () => {
		window.location.reload();
	});
	const [temp] = useState(localStorage.getItem("user"));
	var user = JSON.parse(temp);
	useEffect(() => {
		const init = async () => {
			setIsLoading(false);

			const toastElement = toast.loading("Fetching Tokens");
			try {
				const response = await Api.ProductApi.getProducts();
				let message = response.data.message;
				setProducts(response.data.products);
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
		<>
			<div className="container px-0 py-10 mx-auto">
				<div className="flex flex-wrap -m-4">
					{products.map((product) => {
						return <Product product={product} key={product._id} setProducts={setProducts} products={products} />;
					})}
				</div>
			</div>
		</>
	);
};

export default Products;
