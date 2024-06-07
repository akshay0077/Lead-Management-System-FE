import React from "react";

import { NavLink } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

import { IoMdEye } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

import Paginations from "../Pagination/Paginations";
import { BASE_URL } from "../../services/helper";
import "./table.css";

const Tables = ({
    leadsData,
    handleDeleteLeads,
    handleFetchLeads,
    handlePreviousPage,
    handleNextPage,
    currentPage,
    totalPages,
    handleSetPage,
}) => {
    // Function to handle status chang
    return (
        <div className="container">
            <Row className="w-[1200px]">
                <div className="col mt-0">
                    <Card className="shadow">
                        <Table className="align-items-center" responsive="sm">
                            <thead className="thead-dark">
                                <tr className="table-dark">
                                    <th>ID</th>
                                    <th>Customer Name</th>
                                    <th>Contact Person</th>
                                    <th> Country</th>
                                    <th> Email</th>
                                    <th>Product Enquiry</th>
                                    <th>SEGREGATION</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leadsData.length > 0 ? (
                                    leadsData.map((element, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{index + 1 + (currentPage - 1) * 4}</td>
                                                    <td>{element.customer_name}</td>
                                                    <td>{element.mobile}</td>
                                                    <td>{element.country_name}</td>
                                                    <td>{element.email}</td>
                                                    <td>{element.product_enquiry}</td>
                                                    <td>{element.segregation}</td>

                                                    <td>
                                                        <Dropdown>
                                                            <Dropdown.Toggle
                                                                variant="white"
                                                                id="dropdown-basic"
                                                            >
                                                                <FaEllipsisVertical />
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item>
                                                                    <NavLink
                                                                        to={`/view-lead/${element._id}`}
                                                                        className="text-decoration-none d-flex"
                                                                    >
                                                                        <IoMdEye size={22} color="green" />{" "}
                                                                        <span>View</span>
                                                                    </NavLink>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item>
                                                                    <NavLink
                                                                        to={`/edit-lead/${element._id}`}
                                                                        className="text-decoration-none d-flex"
                                                                    >
                                                                        <FaRegEdit size={19} color="blue" />{" "}
                                                                        <span>Edit</span>
                                                                    </NavLink>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item>
                                                                    <div
                                                                        className="d-flex"
                                                                        onClick={() =>
                                                                            handleDeleteLeads(element._id)
                                                                        }
                                                                    >
                                                                        <MdDelete size={23} color="red" />
                                                                        <span>Delete</span>
                                                                    </div>
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    })
                                ) : (
                                    <div className="no_data text-center">NO Data Found</div>
                                )}
                            </tbody>
                        </Table>
                        <Paginations
                            handlePrevious={handlePreviousPage}
                            handleNext={handleNextPage}
                            page={currentPage}
                            pageCount={totalPages}
                            setPage={handleSetPage}
                        />
                    </Card>
                </div>
            </Row>
            <Toaster />
        </div>
    );
};

export default Tables;