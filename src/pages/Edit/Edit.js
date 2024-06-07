import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { UpdateDataContext } from "../../components/context/ContextProvider";
import { getSingleLead, editLeads } from "../../services/Apis";
import Spiner from "../../components/Spiner/Spiner";

const Edit = () => {
    const [inputdata, setInputData] = useState({
        customer_name: "",
        mobile: "",
        country_name: "",
        email: "",
        product_enquiry: "",
        segregation: "",
    });

    const [showspin, setShowSpin] = useState(true);
    const navigate = useNavigate();
    const { setUpdateData } = useContext(UpdateDataContext);
    const { id } = useParams();

    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value });
    };

    const userProfileGet = async () => {
        try {
            const response = await getSingleLead(id);
            if (response && !response.message) {
                setInputData(response);
            } else {
                toast.error("This ID user profile not found");
            }
        } catch (error) {
            toast.error("Error fetching user data");
        } finally {
            setShowSpin(false);
        }
    };

    const submitLeadsData = async (e) => {
        e.preventDefault();

        const { customer_name, mobile, country_name, email, product_enquiry, segregation } = inputdata;
        const validationErrors = [];

        if (!customer_name.trim()) validationErrors.push("Customer name is required!");
        if (!mobile.trim()) validationErrors.push("Mobile is required!");
        if (mobile.length > 10) validationErrors.push("Enter valid mobile!");
        if (!country_name.trim()) validationErrors.push("Country name is required!");
        if (!email.trim()) validationErrors.push("Email is required!");
        if (!email.includes("@")) validationErrors.push("Enter valid email!");
        if (!product_enquiry.trim()) validationErrors.push("Product enquiry is required!");
        if (!segregation.trim()) validationErrors.push("Segregation is required!");

        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => toast.error(error));
            return;
        }

        try {
            const response = await editLeads(id, inputdata);
            if (response) {
                setUpdateData(response);
                toast.success("Lead's data updated successfully!");
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error("Error updating lead's data");
        }
    };

    useEffect(() => {
        userProfileGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        setTimeout(() => {
            setShowSpin(false);
        }, 1200);
    }, []);

    return (
        <>
            {showspin ? (
                <Spiner />
            ) : (
                <div className="container mx-auto p-4">
                    <h2 className="text-center mt-4 text-2xl font-bold">
                        Update Your Details
                    </h2>
                    <div className="shadow-lg p-6 bg-white mt-6 rounded-md">
                        <form onSubmit={submitLeadsData}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700">Customer name</label>
                                    <input
                                        type="text"
                                        name="customer_name"
                                        value={inputdata.customer_name}
                                        onChange={setInputValue}
                                        placeholder="Enter Customer Name"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Mobile</label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={inputdata.mobile}
                                        onChange={setInputValue}
                                        placeholder="Enter Mobile"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Country</label>
                                    <input
                                        type="text"
                                        name="country_name"
                                        value={inputdata.country_name}
                                        onChange={setInputValue}
                                        placeholder="Enter Your Country"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={inputdata.email}
                                        onChange={setInputValue}
                                        placeholder="Enter Email"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={inputdata.date}
                                        onChange={setInputValue}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Product Enquiry</label>
                                    <textarea
                                        name="product_enquiry"
                                        value={inputdata.product_enquiry}
                                        onChange={setInputValue}
                                        placeholder="Enter Product Enquiry"
                                        className="w-full px-4 py-2 border rounded-md h-24"
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Enter Segregation [REPAIRS, TRADERS]</label>
                                    <input
                                        type="text"
                                        name="segregation"
                                        value={inputdata.segregation}
                                        onChange={setInputValue}
                                        placeholder="Enter Segregation [REPAIRS, TRADERS]"
                                        className="w-full px-4 py-2 border rounded-md"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    <Toaster position="top-center" />
                </div>
            )}
        </>
    );
};

export default Edit;
