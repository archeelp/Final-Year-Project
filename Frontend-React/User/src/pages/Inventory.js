import Api from "../utils/Api/ProductApi.js";
import { responseErrorHandler } from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import SC from "../utils/smartContractUtil.js";
import { useNavigate } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "../components/InputTag/InputTag.css"
import { oneETH } from "../constants"
import { toast } from "react-toastify"

const Inventory = () => {
	const navigate = useNavigate();
	window.ethereum.on("accountsChanged", () => {
		window.location.reload();
	});

	const [isLoading, setisLoading] = useState(true);
	const [temp] = useState(localStorage.getItem("user"));
	var user = (JSON.parse(temp))
	const { tokenID } = useState(user.token);
	var certi = [];
	const [token, setToken] = useState([]);
	const [product, setProduct] = useState([]);

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
				toast.success("Your token has been proposed")
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
		};

	}
	const fileSelectedHandler = (e) => {
		console.log(form)
		for (var i = 0; i < e.target.files.length; i++) {
			console.log(i)
			var file = e.target.files[i];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function () {
				certi.push(reader.result);
			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
		}
		form.certificates = certi;
	}
	// Using the State hook to declare our tags variable and setTags to update the variable.
	const [tags, setTags] = useState([

	]);
	const removeTag = (i) => {
		const newTags = [...tags];
		newTags.splice(i, 1);

		// Call the defined function setTags which will replace tags with the new value.
		setTags(newTags);
	};
	var tagInput = null;
	const [approved, setApproved] = useState(false);
	const inputKeyDown = (e) => {
		var val = e.target.value;
		console.log(e.key)
		if (e.key === ',' && val) {
			console.log(val)
			val = val.replace(",", "");

			if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
				return;
			}
			setTags([...tags, val]);
			console.log(tags)

			tagInput.value = "";
		} else if (e.key === 'Backspace' && !val) {
			removeTag(tags.length - 1);
		}
	};
	useEffect(() => {
		const init = async () => {
			if (user.token !== undefined) {
				try {
					const response = await Api.token.getToken(user.token);
					const { token } = response.data;
					console.log(token);
					setToken({
						...token,
					});
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
			<div className="text-gray-600 lg:mx-20 sm:mx-0">

				<form action="#" method="POST" onSubmit={handleSubmit}>
				
					<div className="p-10 mt-10 bg-gray-100 rounded-xl">
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<div className="px-4 sm:px-0">
									<h3 className="text-lg font-medium leading-6 text-gray-900">Product Information</h3>
									<p className="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you share.</p>
								</div>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<div className="shadow overflow-hidden sm:rounded-md">
									<div className="px-4 py-5 bg-white sm:p-6">
										<div className="grid grid-cols-6 gap-6">
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
											<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
												<div className="space-y-1 text-center">
													<svg
														className="mx-auto h-12 w-12 text-gray-400"
														stroke="currentColor"
														fill="none"
														viewBox="0 0 48 48"
														aria-hidden="true"
													>
														<path
															d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
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
											<div className="col-span-6 sm:col-span-4">
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
									</div>

								</div>
							</div>
						</div>
					</div>
					
				
					<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
						<button
							type="submit"
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Inventory;
