import './App.css';

import { Routes, Route } from "react-router-dom"
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/*' element={<NotFound />} />
  </Routes>
  );
}

export default App;
