import db from "../models/index.js";

const getTokens = async (req, res) => {
  try {
    // get token requests
    const allTokens = await db.ProposedToken.find({});
    res
      .status(200)
      .json({ tokens: allTokens, message: "All Token from database retrieved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getToken = async (req, res) => {
  try {
    // get token by token._id
    const tokenDetails = await db.ProposedToken.findById(req.params.id);
    res
      .status(200)
      .json({ token: tokenDetails, message: "Requested Token details retrieved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  getToken,
  getTokens
};