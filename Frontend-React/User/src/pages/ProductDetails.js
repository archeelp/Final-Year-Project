import Api from "../utils/Api/Api.js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import { useParams } from "react-router-dom";
import {
    ServerIcon,
    DeviceMobileIcon,
    UserIcon,
    LocationMarkerIcon,
    AtSymbolIcon
} from "@heroicons/react/outline";
import SC from "../utils/smartContractUtil.js";

const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const [owner, setOwner] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const { productID } = useParams();
    const [temp] = useState(localStorage.getItem("user"));
    const user = JSON.parse(temp);

    window.ethereum.on("accountsChanged", () => {
        window.location.reload();
    });

    const buyProduct = async () => {
        SC.buyProduct(product.token.tokenIndex, product._id, product.cost, address, mobileNumber, email, name).then(() => {
            toast.success("Product Purchased");
        }).catch((error) => {
            responseErrorHandler(error);
        });
    }

    useEffect(() => {
        const init = async () => {
            const toastElement = toast.loading("Fetching Tokens");
            try {
                const response = await Api.ProductApi.getProduct(productID);
                SC.init()
					.catch((err) => {
						console.log(err);
						toast.error("Can't connect to MetaMask");
					});
                const { productDetails, owner, message } = response.data;
                setProduct(productDetails);
                toast.update(toastElement, {
                    render: message,
                    type: "success",
                    isLoading: false,
                    autoClose: true,
                });
                setOwner(owner);
                setIsLoading(false);
            } catch (error) {
                responseErrorHandler(error, toastElement);
            }
        };
        return init();
    }, [productID]);

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-20 mx-auto">
                    <div className="w-full flex">
                        <div className="tokenDetails w-1/2 mx-2 p-1 bg-slate-50	 justify-center">
                            <div className="flex flex-wrap justify-center">
                                <img className="w-1/3 h-1/3"
                                    alt="ecommerce"
                                    src={product.image}
                                />
                            </div>
                            <div className="xl:w-full md:w-full p-2">
                                <div className=" ">
                                    Owner Info:
                                    <div className="rounded-full bg-gray-200 m-2 p-2 border-0 flex flex-row">
                                        <UserIcon className="rounded-full w-6 h-6 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500" />
                                        <h3 className="tracking-widest text-indigo-500 text-md font-medium title-font">
                                            Name:
                                        </h3>
                                        <h2 className="text-md text-gray-900 font-medium title-font m-auto">
                                            {owner.name}
                                        </h2>
                                    </div>
                                    <div className="rounded-lg grid grid-cols-2 m-1">
                                        <div className=" ">
                                            <div className="rounded-full bg-gray-200 pt-2 pb-2 m-1 border-0 flex flex-row">
                                                <AtSymbolIcon className="rounded-full w-6 h-6 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500" />
                                                <h3 className="tracking-widest text-indigo-500 text-md font-medium title-font">
                                                    Email:
                                                </h3>
                                                <h2 className="text-md text-gray-900 font-medium title-font m-auto">
                                                    {owner.email}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="rounded-full bg-gray-200 pt-2 pb-2 m-1 border-0 flex flex-row">
                                            <DeviceMobileIcon className="rounded-full w-6 h-6 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500" />
                                            <h3 className="tracking-widest text-indigo-500 text-md font-medium title-font">
                                                Mobile:
                                            </h3>
                                            <h2 className="text-md text-gray-900 font-medium title-font m-auto">
                                                {owner.mobile}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 bg-slate-50 mr-2">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                PRODUCT NAME
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {product.name?.toUpperCase()}
                            </h1>
                            <div className="flex mb-1 w-50">
                                <span className="text-gray-600">
                                    Description: {product.description}
                                </span>
                            </div>
                            <div className="flex mb-4">
                                <h3 className="text-l font-medium flex items-center text-indigo-600">
                                    PRICE: {product.cost}{" "} {product.token.name} Token
                                </h3>
                            </div>
                            <div className="flex mb-4 mt-6">
                                <ServerIcon className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500 ml-4" />
                                <span className="title-font font-medium text-2xl text-gray-900 ml-2 mt-0.5">
                                    Total Stock: {product.quantity}
                                </span>
                            </div>
                            <br></br>
                            <div className="flex m-auto">
								<div className="flex flex-col">
                                    <div className="flex">
                                    <LocationMarkerIcon className=" rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500 m-auto" />
									<input
										type="text"
										name="address"
										onChange={(e) => {
											setAddress(e.target.value);
										}}
										placeholder="Delivery Address"
										className="mb-2 mr-2 ml-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									/>
                                    </div>
                                    <div className="flex">
                                    <UserIcon className=" rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500 m-auto" />
                                    <input
										type="text"
										name="name"
										onChange={(e) => {
											setName(e.target.value);
										}}
										placeholder="Name"
										className="mr-2 ml-2 mb-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									/>
                                    </div>
                                    <div className="flex">
                                    <AtSymbolIcon className=" rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500 m-auto" />
                                    <input
										type="text"
										name="email"
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										placeholder="Email"
										className="mb-2 mr-2 ml-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									/>
                                    </div>
                                    <div className="flex">
                                    <DeviceMobileIcon className=" rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500 m-auto" />
                                    <input
										type="text"
										name="mobileNumber"
										onChange={(e) => {
											setMobileNumber(e.target.value);
										}}
										placeholder="Mobile Number"
										className="mr-2 mb-2 ml-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
									/>
                                    </div>
								</div>
								<button
                                    onClick={buyProduct}
                                    className="flex m-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                >
                                    Buy
                                </button>
							</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;