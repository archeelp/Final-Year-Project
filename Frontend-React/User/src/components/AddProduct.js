import Api from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import React, { useEffect, useState } from "react";
import "../components/InputTag/InputTag.css"
import { oneETH } from "../constants"
import { toast } from "react-toastify"
const AddProduct = () => {
	window.ethereum.on("accountsChanged", () => {
		window.location.reload();
	});
	const [isLoading, setisLoading] = useState(true);
	const [temp] = useState(localStorage.getItem("user"));
	var user = (JSON.parse(temp))
	const { tokenID } = useState(user.token);
	const [form, setForm] = useState({
		name: '',
		image: '',
		description: '',
		cost: '',
		quantity: '',
	});
	const handleChange = e => {
		const { name, value } = e.target;
		setForm(form => ({
			...form,
			[name]: value
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log(form)
		try {
			const response = await Api.ProductApi.addProduct(form);
			toast.success("Your product has been added")
			console.log(response);
		}
		catch (error) {
			console.log(error);
		}

	}
	const handleProfileImage = (e) => {
		let reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function () {
			form.image = reader.result;
			document.getElementById('testimg').src=reader.result;

		};
	}
	
	useEffect(() => {
		const init = async () => {
			if (user.token !== undefined) {
				try {
					const response = await Api.token.getToken(user.token);
					const { token } = response.data;
					console.log(token);
				
					console.log(token)

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
				<form action="#" method="POST" onSubmit={handleSubmit}>
								<div className="shadow overflow-hidden sm:rounded-md">
									<div className="px-4 py-5 bg-white sm:p-6">
										<h1>Add A Product</h1>
										<div className="col-span-6 sm:col-span-3">
											<label htmlFor="name" className="block text-sm font-medium text-gray-700">
												Name
											</label>
											<input
												type="text"
												name="name"
												id="name"
												autoComplete="name"
												required
												value={form.name}
												onChange={(e) => setForm({ ...form, name: e.target.value })}

												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Product Photo</label>
											<div className="grid grid-cols-10 gap-6">
								
								<div className="col-span-6 sm:col-span-3">

									<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
										<div className="space-y-1 text-center">
										<img
										id="testimg"
										className="h-40 rounded w-full object-contain object-center mb-6"
										src={form.image}
										alt="content"
									/>
											<div className="flex text-sm text-gray-600">
												<label
													htmlFor="image"
													className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
												>
													<span>Upload a file</span>
													<input id="image" name="image" type="file" className="sr-only" defaultValue={form.image} onChange={handleProfileImage} />
												</label>
												<p className="pl-1">or drag and drop</p>
											</div>
											<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
										</div>
									</div>
								</div>
							</div>
										</div>
										<div className="width-full">
											<label htmlFor="description" className="block text-sm font-medium text-gray-700">
												Description
											</label>
											<input
												type="text"
												name="description"
												id="description"
												autoComplete="email"
												defaultValue={form.description}
												onChange={handleChange}
												required
												className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
											/>
										</div>
										<div className="grid grid-cols-10 gap-6">

											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="cost" className="block text-sm font-medium text-gray-700">
													Cost
												</label>
												<input
													type="text"
													name="cost"
													id="cost"
													required
													autoComplete="cost"
													defaultValue={form.cost}
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>
											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
													Quantity
												</label>
												<input
													type="number"
													name="quantity"
													id="quantity"
													required
													autoComplete="quantity"
													defaultValue={form.quantity}
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>
										</div>
										<div className="px-4 py-3 text-right sm:px-6">
											<button
												type="submit"
												className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>
												Add
											</button>
										</div>
									</div>
							</div>
								</form>
		</>
	);
};

export default AddProduct;
