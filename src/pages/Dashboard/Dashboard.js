import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { FiPlus } from "react-icons/fi";

import Tables from "../../components/Tables/Tables";
import Spiner from "../../components/Spiner/Spiner.js";
// AddDataContext,
import { UpdateDataContext, DeleteDataContext } from "../../components/context/ContextProvider.js";

import { getLeads, deleteLeadsApi, exportToCsv, importToCsv } from "../../services/Apis.js";

import "./dashboard.css";

const Home = () => {
  const [leadsData, setLeadsData] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { updateData, setUpdateData } = useContext(UpdateDataContext);
  const { deleteData, setDeleteData } = useContext(DeleteDataContext);

  const navigate = useNavigate();

  const addlead = () => {
    navigate("/dashboard/lead-entry");
  };

  // Get The Leads Data
  const leadsGet = async () => {
    try {
      const response = await getLeads();
      if (response !== undefined) {
        setLeadsData(response.leadsData);
        setPageCount(response.Pagination.pageCount);
      }
    } catch (error) {
      console.error("Error fetching Leads data:", error);
    }
  };

  // Delete The Perticular Leads Based on Id
  const deleteLeads = async (id) => {
    const response = await deleteLeadsApi(id);
    if (response !== undefined) {
      leadsGet();
      setDeleteData(response);
    } else {
      toast.error("error");
    }
  };

  // Export Leads Data in to CSV file
  const exportleads = async () => {
    const response = await exportToCsv();
    console.log(response);
    if (response !== undefined) {
      window.open(response.downloadUrl, "blank");
    } else {
      toast.error("error !");
    }
  };

  // Export Leads Data in to CSV file
  // const importleads = async () => {
  //   const response = await importToCsv();
  //   console.log(response);
  //   if (response !== undefined) {
  //     window.open(response.downloadUrl, "blank");
  //   } else {
  //     toast.error("error !");
  //   }
  // };

  // Pagination Handle
  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  // Click in to Next Button
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    leadsGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  return (
    <>
      {updateData ? (
        <Alert variant="primary" onClose={() => setUpdateData("")} dismissible>
          {updateData.customer_name.toUpperCase()} Succesfully Update
        </Alert>
      ) : (
        ""
      )}

      {deleteData ? (
        <Alert variant="danger" onClose={() => setDeleteData("")} dismissible>
          {deleteData.customer_name.toUpperCase()} Succesfully Delete
        </Alert>
      ) : (
        ""
      )}

      <div className="container">
        <Container className="main_div mt-4">
          <Row className="search_add d-flex justify-content-between">
            {/* <Col xs={12} lg={4} className="mb-3 mb-lg-0">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="danger">Search</Button>
              </Form>
            </Col> */}
            <Col xs={12} lg={12} className="d-flex justify-content-end">
              <div className="add_btn px-2">
                <Button variant="danger" onClick={addlead} className="d-flex">
                  <FiPlus size={22} /> Add New Leads
                </Button>
              </div>
              <div className="export_csv px-2">
                <Button variant="danger" onClick={exportleads}>
                  Export To Csv
                </Button>
              </div>
              <div className="export_csv px-2">
                <Button variant="danger" onClick={importToCsv}>
                  Import CSV To DB
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="my-5">
          {showspin ? (
            <Spiner />
          ) : (
            <Tables
              leadsData={leadsData}
              handleDeleteLeads={deleteLeads}
              handleFetchLeads={leadsGet}
              handlePreviousPage={handlePrevious}
              handleNextPage={handleNext}
              currentPage={page}
              totalPages={pageCount}
              handleSetPage={setPage}
            />
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Home;