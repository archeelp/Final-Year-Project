import Api from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import React, { useEffect, useState } from "react";
import "../components/InputTag/InputTag.css"
import { oneETH } from "../constants"
import { toast } from "react-toastify"
import AddProduct from "../components/AddProduct"
const Inventory = () => {
	window.ethereum.on("accountsChanged", () => {
		window.location.reload();
	});
	const [isLoading, setisLoading] = useState(true);
	const [temp] = useState(localStorage.getItem("user"));
	var user = (JSON.parse(temp))
	const { tokenID } = useState(user.token);

	useEffect(() => {
		const init = async () => {
			if (user.token !== undefined) {
				try {
					const response = await Api.token.getToken(user.token);
					const { token } = response.data;
					console.log(token);
				
					// setTokenIndex(token.tokenIndex);
				} catch (error) {
					console.log(error);
				}
			}
		};
		setisLoading(false)
		return init();
	}, [tokenID]);

	return isLoading ? (
		<Loader />
	) : (
		<>
			<AddProduct/>
		</>
	);
};

export default Inventory;
