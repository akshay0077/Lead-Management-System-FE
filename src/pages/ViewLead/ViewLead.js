import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import Card from "react-bootstrap/Card";


import Spiner from "../../components/Spiner/Spiner";
import { getSingleLead } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import "./viewlead.css";

const ViewLead = () => {
    const [leadView, setLeadView] = useState({});
    const [showspin, setShowSpin] = useState(true);

    // Extracting id from URL parameters
    const { id } = useParams();

    // Function to fetch user profile data
    const leadViewGet = async () => {
        try {
            const response = await getSingleLead(id);
            if (response && !response.message) {
                setLeadView(response);
            } else {
                toast.error("This Id user Profile Not Found ");
            }
        } catch (error) {
            toast.error("Error fetching user profile:", error);
        } finally {
            setShowSpin(false);
        }
    };

    useEffect(() => {
        leadViewGet();
        setTimeout(() => {
            setShowSpin(false);
        }, 1200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return (
        <>
            {showspin ? (
                <Spiner />
            ) : (
                <div className="container">
                    {Object.keys(leadView).length === 0 ? (
                        <h1 className="text-center">404 - Leads Data Not Found</h1>
                    ) : (
                        <Card className="card-profile shadow col-lg-12 mx-auto mt-5">
                            <Card.Body>
                                <div className="text-center">
                                    <h3>Customer Name :- {leadView.customer_name}</h3>
                                    <h4>
                                        Phone :- <span>{leadView.mobile}</span>
                                    </h4>
                                    <h5>
                                        Country :- <span>{leadView.country_name}</span>
                                    </h5>
                                    <h4>
                                        Email :- <span>{leadView.email}</span>
                                    </h4>
                                    <h4>
                                        Product Enquiry :- <span>{leadView.product_enquiry}</span>
                                    </h4>
                                    <h4>
                                        Segregation  :- <span>{leadView.segregation}</span>
                                    </h4>
                                    <h4>
                                        Created Date  :- <span>{leadView.datecreated}</span>
                                    </h4>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                    <Toaster />
                </div>
            )}
        </>
    );
};

export default ViewLead;