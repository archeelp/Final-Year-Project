import axios from "./axios.js";

const ProductApi = {
	getProducts: () => {
		return axios.get(`/products`);
	},
	getProductsOf: (tokenId) => {
		//only products of a particular token ID
		return axios.get(`/products/${tokenId}`);
	},
	getProduct: (productId) => {
		return axios.get(`/products/${productId}`);
	},
	editProductDetails: (productDetails) => {
		return axios.put(`/athlete/products`, productDetails);
	},
	addProduct: (productDetails) => {
		return axios.post(`/athlete/products`, productDetails);
	},
};

export default ProductApi;
