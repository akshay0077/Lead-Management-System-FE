import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

import { IoMdEye } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEllipsisVertical } from "react-icons/fa6";

import Paginations from "../Pagination/Paginations";
import "./table.css";

const Tables = ({
    leadsData,
    handleDeleteLeads,
    handlePreviousPage,
    handleNextPage,
    currentPage,
    totalPages,
    handleSetPage,
}) => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        if (newSelectAll) {
            setSelectedRows(leadsData.map((lead) => lead._id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id) => {
        const newSelectedRows = selectedRows.includes(id)
            ? selectedRows.filter((rowId) => rowId !== id)
            : [...selectedRows, id];
        setSelectedRows(newSelectedRows);
    };
    // Function to handle status chang
    return (
        <div className="container">
            <Row className="w-[1200px]">
                <div className="col mt-0">
                    <Card className="shadow">
                        <Table className="align-items-center" responsive="sm">
                            <thead className="thead-dark">
                                <tr className="table-dark">
                                    <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
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
                                                <tr key={element._id}>
                                                    <td> <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(element._id)}
                                                        onChange={() => handleSelectRow(element._id)}
                                                    /></td>
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