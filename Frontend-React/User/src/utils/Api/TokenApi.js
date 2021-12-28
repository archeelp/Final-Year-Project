import axios from "./axios.js";

const TokenApi = {
  getTokens: () => {
    return axios.get(`/tokens`);
  },
  getToken: (tokenID) => {
    return axios.get(`/tokens/${tokenID}`);
  },
  editTokenDetails: (tokenID,tokenDetails) =>
  {
    return axios.put(`/athlete/token`,tokenDetails);
  },
};

export default TokenApi;
