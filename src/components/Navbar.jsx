import { useContext } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const isAdmin = useAdmin();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {/* for mobile device */}
        <details className="dropdown sm:block lg:hidden">
          <summary className="m-1 btn">
            <RxDropdownMenu />
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <div>
                <li>
                  <Link to="/userDashboard">Dashboard</Link>
                </li>
              </div>
            )}
            {isAdmin && (
              <li>
                <Link to="/adminDashboard">Admin Dashboard</Link>
              </li>
            )}
          </ul>
        </details>
        <a className="btn btn-ghost text-xl font-bold">MediCare HUB</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <div>
              <li>
                <Link to="/userDashboard">Dashboard</Link>
              </li>
            </div>
          )}
          {isAdmin && (
            <li>
              <Link to="/adminDashboard">Admin Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
      <div></div>
      <div className="navbar-end flex items-center gap-5">
        <div className={`avatar ${user ? "online" : "offline"}`}>
          <div className="w-12 border border-separate border-black rounded-full">
            <img src={user?.photoURL} alt="Avatar" />
          </div>
        </div>
        {user ? (
          <button onClick={logout} className="btn">
            Logout
          </button>
        ) : (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
