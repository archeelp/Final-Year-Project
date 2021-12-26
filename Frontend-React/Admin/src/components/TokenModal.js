import { useState } from "react";
import React from "react";
import Api, { responseErrorHandler } from "../utils/Api/Api";
import { toast } from "react-toastify";
// import validator from "validator";
import Popup from "./Popup/Popup";
// import Input from "./Input";
// import Radio from "./Radio";

const AuthModal = ({ setIsAuthenticated, close, isSignIn }) => {
	const [signIn, setSignIn] = useState(isSignIn);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mobile, setMobile] = useState("");
	const [name, setName] = useState("");
	const [role, setRole] = useState("student");

	const submit = async () => {
		const toastElement = toast.loading("Loading token details");
		try {
			const response = await Api.toast.update(toastElement, {
				render: signIn
					? "Logged In Successfully"
					: "Account Created Successfully",
				type: "success",
				isLoading: false,
				autoClose: true,
			});
			return close();
		} catch (error) {
			responseErrorHandler(error, toastElement);
		}
	};

	return (
		<div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 modal">
			<h2 className="text-gray-900 text-lg font-medium title-font mb-5">
				TOKEN DETAILS
			</h2>
			<button
				onClick={submit}
				className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
			>
				xyz
			</button>
		</div>
	);
};

const Auth = ({ setIsAuthenticated, isSignIn, className, ...props }) => {
	return (
		<Popup
			Button={<button className={className}>LogIn</button>}
			Modal={AuthModal}
			setIsAuthenticated={setIsAuthenticated}
			isSignIn={isSignIn}
			{...props}
		/>
	);
};

export default Auth;
