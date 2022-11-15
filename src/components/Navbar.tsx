import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/add">Add User</NavLink>
    </nav>
  );
};

export default Navbar;
