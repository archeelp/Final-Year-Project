import axios from "./axios.js";

const TokenApi = {
  getTokens: () => {
    return axios.get(`/getAllTokens`);
  },
  getToken: (tokenID) => {
    return axios.get(`/getTokenDetails/${tokenID}`);
  },
};

export default TokenApi;
