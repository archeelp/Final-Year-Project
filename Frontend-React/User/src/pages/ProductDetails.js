import Api from "../utils/Api/Api.js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import { useParams } from "react-router-dom";
import {
    CashIcon,
    AtSymbolIcon,
    ServerIcon,
    DeviceMobileIcon,
    UserIcon,
} from "@heroicons/react/outline";

const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const [owner, setOwner] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { productID } = useParams();
    const [temp] = useState(localStorage.getItem("user"));
    const user = JSON.parse(temp);

    window.ethereum.on("accountsChanged", () => {
        window.location.reload();
    });

    useEffect(() => {
        const init = async () => {
            const toastElement = toast.loading("Fetching Tokens");
            try {
                const response = await Api.ProductApi.getProduct(productID);
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
                                <img
                                    alt="ecommerce"
                                    src={product.image}
                                    width="600px"
                                    height="600px"
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
                                    PRICE: {product.cost}{" "} ETH
                                </h3>
                            </div>
                            <div className="flex mb-4 mt-6">
                                <ServerIcon className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500 ml-4" />
                                <span className="title-font font-medium text-2xl text-gray-900 ml-2 mt-0.5">
                                    Stock Left: {product.quantity}
                                </span>
                            </div>

                            <div className="flex mb-4">
                                <CashIcon className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-indigo-500 ml-4 mr-4" />
                                <input
                                    type="number"
                                    name="amount"
                                    onChange={(e) => {

                                    }}
                                    placeholder="Quantity"
                                    className="mr-2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                <div className="mt-1.5">
                                    {product.cost} ETH
                                </div>
                                <button

                                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
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