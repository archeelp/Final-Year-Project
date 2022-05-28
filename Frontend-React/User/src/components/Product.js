import { useNavigate } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import Popup from "../components/Popup/Popup.js";
import EditProduct from "../components/EditProduct.js";
import { Link } from 'react-router-dom';
import React, { useState } from "react";

const Product = ({ product, setProducts, products}) => {
	const navigate = useNavigate();
	const [temp] = useState(localStorage.getItem("user"));
	const user = JSON.parse(temp);
	return (
		<div
			className="hover:animate-pulse text-center xl:w-1/4 md:w-1/2 p-4"
			onClick={() => navigate(`/products/${product._id}`)}
		>
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
				<p className="mt-1 text-gray-900 leading-relaxed text-base">
					{product.description}
				</p>
				<div className="flex m-auto justify-center">
					<CurrencyDollarIcon className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500 " />
					<span className="title-font font-medium text-sm text-gray-900 my-auto">
						{product.cost} {product.token.name} TOKEN
					</span>
				</div>
				<h2 className="text-lg text-gray-900 font-medium title-font m-auto">
					Total Quantity: {product.quantity}
				</h2>
				<div className="text-center ">
				<Link
					to={`/products/${product._id}`}
					className="inline-flex justify-center py-2 px-4  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					View Details
				</Link>
				{" "}
				{user && user._id === product.owner && (
					<Popup
						Button={
							<button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Edit
							</button>
						}
						Modal={EditProduct}
						ProductId={product._id}
						ProductName={product.name}
						ProductCost={product.cost}
						ProductQuantity={product.quantity}
						ProductImage={product.image}
						ProductDescription={product.description}
						setProducts = {setProducts}
						products = {products}
					/>
				)}
				</div>

			</div>
		</div>
	);
};

export default Product;
