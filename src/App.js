
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import LeadEntry from "./pages/LeadEntry/LeadEntry";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from "./pages/Edit/Edit";
import ViewLead from "./pages/ViewLead/ViewLead";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/lead-entry" element={<LeadEntry />} />
        <Route path="/edit-lead/:id" element={<Edit />} />
        <Route path="/view-lead/:id" element={<ViewLead />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
