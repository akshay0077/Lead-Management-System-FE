import { commonRequest } from "./ApiCall";
import { BASE_URL } from "./helper";

// Function to Login a user
export const loginUser = async (data, header) => {
  /*
    Makes a POST request to Login a user.
    
    Parameters:
    - data: Object containing user data.
    - header: Optional header for the request.
 
    Returns:
    - Promise containing response data.
  */
  return await commonRequest("POST", `${BASE_URL}/api/v1/auth/login`, data, header);
};

// Function to Create a Leads
export const createNewLeads = async (data, header) => {
  /*
    Makes a POST request to Login a user.
    
    Parameters:
    - data: Object containing user data.
    - header: Optional header for the request.
 
    Returns:
    - Promise containing response data.
  */
  return await commonRequest("POST", `${BASE_URL}/api/v1/lead/create-lead`, data, header);
};

// Function to get details of a single Leads
export const getSingleLead = async (id) => {
  /*
    Makes a GET request to fetch details of a single Lead.

    Parameters:
    - id: ID of the Lead.

    Returns:
    - Promise containing response data.
  */
  return await commonRequest("GET", `${BASE_URL}/api/v1/lead/single-lead/${id}`, "");
};

// Function to get a All Leads
export const getLeads = async () => {
  /*
    Makes a GET request to fetch a list of Leads.
 
    Returns:
    - Promise containing response data.
  */
  return await commonRequest("GET", `${BASE_URL}/api/v1/lead/all-leads`);
};


// Function to edit Leads details
export const editLeads = async (id, data, header) => {
  /*
    Makes a PUT request to edit Leads details.
 
    Parameters:
    - id: ID of the Leads to be edited.
    - data: Object containing updated user data.
    - header: Optional header for the request.
 
    Returns:
    - Promise containing response data.
  */
  return await commonRequest("PUT", `${BASE_URL}/api/v1/lead/update-lead/${id}`, data, header);
};

// Function to delete a user
export const deleteLeadsApi = async (id) => {
  /*
    Makes a DELETE request to delete a user.
 
    Parameters:
    - id: ID of the user to be deleted.
 
    Returns:
    - Promise containing response data.
  */
  return await commonRequest("DELETE", `${BASE_URL}/api/v1/lead/delete-lead/${id}`, {});
};


// Function to export users to CSV
export const exportToCsv = async () => {
  /*
    Makes a GET request to export users to CSV.
 
    Returns:
    - Promise containing response data.
  */
  return await commonRequest("GET", `${BASE_URL}/api/v1/lead/leadexport`, "");
};

// Function to export users to CSV
export const importToCsv = async () => {
  /*
    Makes a GET request to export users to CSV.
 
    Returns:
    - Promise containing response data.
  */
  return await commonRequest("POST", `${BASE_URL}/api/v1/lead/leadimport`, "");
};