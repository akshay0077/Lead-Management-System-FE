import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { AddDataContext } from "../../components/context/ContextProvider";
import { createNewLeads } from "../../services/Apis";

const LeadEntry = () => {
  const [inputdata, setInputData] = useState({
    customer_name: "",
    mobile: "",
    country_name: "",
    email: "",
    product_enquiry: "",
    segregation: "",
  });

  const navigate = useNavigate();
  const { setLeadsData } = useContext(AddDataContext);

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const submitLeadsData = async (e) => {
    e.preventDefault();

    const { customer_name, mobile, country_name, email, product_enquiry, segregation } = inputdata;
    const validationErrors = [];

    if (!customer_name.trim()) validationErrors.push("Customer name is required!");
    if (!mobile.trim()) validationErrors.push("Mobile is required!");
    if (mobile.length > 10) validationErrors.push("Enter valid mobile!");
    if (!country_name) validationErrors.push("Country Name is required!");
    if (!email.trim()) validationErrors.push("Email is required!");
    if (!email.includes("@")) validationErrors.push("Enter valid email!");
    if (!product_enquiry) validationErrors.push("Product Enquiry is required!");
    if (!product_enquiry.trim()) validationErrors.push("Product enquiry is required!");
    if (!segregation) validationErrors.push("Segregation is required!");

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.error(error));
      return;
    }

    const data = new FormData();
    data.append("customer_name", customer_name);
    data.append("mobile", mobile);
    data.append("country_name", country_name);
    data.append("email", email);
    data.append("product_enquiry", product_enquiry);
    data.append("segregation", segregation);

    const config = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await createNewLeads(data, config);
      if (response !== undefined) {
        setInputData({
          ...inputdata,
          customer_name: "",
          mobile: "",
          country_name: "",
          email: "",
          product_enquiry: "",
          segregation: "",
        });
        setLeadsData(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Error for Creating New Leads profile");
    }
  };


  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-center mt-4 text-2xl font-bold">
          Add New Details
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
                <label className="block text-gray-700">
                  Country
                </label>
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
                <label className="block text-gray-700">Enter Segregation [REPAIRS,TRADERS ]</label>
                <input
                  type="text"
                  name="segregation"
                  value={inputdata.segregation}
                  onChange={setInputValue}
                  placeholder="Enter Segregation [REPAIRS,TRADERS ]"
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
    </>
  );
};

export default LeadEntry;
