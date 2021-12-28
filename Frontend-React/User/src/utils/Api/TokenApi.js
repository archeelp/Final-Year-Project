import axios from "./axios.js";

const TokenApi = {
  getTokens: () => {
    return axios.get(`/tokens`);
  },
  getToken: (tokenID) => {
    return axios.get(`/tokens/${tokenID}`);
  },
  editTokenDetails: (tokenDetails) =>
  {
    return axios.put(`/athlete/token`,tokenDetails);
  },
  proposeToken: (tokenDetails) =>
  {
    return axios.post(`/athlete/token`,tokenDetails);
  },
};

export default TokenApi;
