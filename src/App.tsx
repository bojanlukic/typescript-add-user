import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <header>Add User</header>
        <div className="page-body">
          <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="add" element= {<AddUser/>} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
