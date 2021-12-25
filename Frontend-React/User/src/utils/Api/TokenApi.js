import axios from "./axios.js";

const TokenApi = {
  getTokens: () => {
    return axios.get(`/getAllTokens`);
  },
  getToken: (tokenID) => {
    return axios.get(`/getTokenDetails/${tokenID}`);
  },
   editTokenDetails: (tokenID,tokenDetails) =>
  {
    return axios.put(`/editTokenDetails/${tokenID}`,tokenDetails);
  },
};

export default TokenApi;
