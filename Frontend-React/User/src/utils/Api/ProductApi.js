import axios from "./axios.js";

const ProductApi = {
	getProducts: () => {
		return axios.get(`/products`);
	},
	getProductsOf: (tokenId) => {
		//only products of a particular token ID
		return axios.get(`/productsOf/${tokenId}`);
	},
	getProduct: (productId) => {
		return axios.get(`/products/${productId}`);
	},
	editProductDetails: (productDetails,productId) => {
		return axios.put(`/athlete/products/${productId}`, productDetails);
	},
	addProduct: (productDetails) => {
		return axios.post(`/athlete/product`, productDetails);
	},
	getOrders: ()=>{
		return axios.get(`/athlete/orders`);
	}
};

export default ProductApi;
