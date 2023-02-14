import Link from "next/link";
import { useAuth } from "../../services/auth-context";
import MenuList from "../landingpage/MenuList";
import Sidemenu from "./Sidemenu";

const Navbar = () => {
  const { user, login, logOut } = useAuth();
  return (
    <>
      <div className="sidemenu">
        <Sidemenu />
      </div>
      <nav className="navbar">
        <div id="navbarMenu" className="navbar-menu">
          <Link href="/landingpage">
            <a className="navbar-item  is-size-5 has-text-weight-semibold">
              Landingpage
            </a>
          </Link>

          <div className="navbar-end">
            <div className=" navbar-item">
              <div className="control has-icons-left">
                <input
                  className="input is-rounded"
                  type="email"
                  placeholder="Search"
                />
                <span className="icon is-left">
                  <i className="fa fa-search"></i>{" "}
                </span>
              </div>
            </div>
            {user.email != null && (
              <Link href="/home">
                <a className="navbar-item is-active is-size-5 has-text-weight-semibold">
                  Home
                </a>
              </Link>
            )}

            {user.email == null && (
              <Link href="/login">
                <a className="navbar-item is-size-5 has-text-weight-semibold">
                  Login
                </a>
              </Link>
            )}

            {user.email != null && (
              <Link href="/landingpage">
                <a
                  onClick={logOut}
                  className="navbar-item is-size-5 has-text-weight-semibold"
                >
                  Logout{" "}
                </a>
              </Link>
            )}
            <Link href="/about">
              <a className="navbar-item is-size-5 has-text-weight-semibold">
                About Us
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
