import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewPatient from "./pages/NewPatient";
import Patients from "./pages/Patients";
import Manage from "./pages/Manage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewPatient />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/manage" element={<Manage />} />
    </Routes>
  );
}