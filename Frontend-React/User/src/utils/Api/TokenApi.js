import axios from "./axios.js";

const TokenApi = {
  getTokens: () => {
    return axios.get(`/getAllTokens`);
  },
  getToken: (tokenID) => {
    return axios.get(`/getTokenDetails/${tokenID}`);
  },
  getCreatedToken: (tokenName) =>
  {
    return axios.get(`/getCreatedToken/${tokenName}`);
  },
};

export default TokenApi;
