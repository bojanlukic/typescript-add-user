import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>Add User</header>
        <div className="page-body">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
