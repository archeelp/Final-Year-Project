import axios from "./axios.js";

const TokenApi = {
	getTokens: () => {
		return axios.get(`/getAllTokens`);
	},
	getToken: (tokenID) => {
		return axios.get(`/getTokenDetails/${tokenID}`);
	},
	getTokenRequests: () => {
		return axios.get(`/getTokenRequests`);
	},
	getApprovedTokens: () => {
		return axios.get(`/getApprovedTokens`);
	},
};

export default TokenApi;
