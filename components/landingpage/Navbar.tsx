import Link from "next/link"
import {useAuth} from "../../shared-components/services/auth-context";


const Navbar = () => {
	const { user, login, logOut } = useAuth();
	return (
		<nav className="navbar">
			<div className="container">
				<div className="navbar-brand">
					<a className="navbar-item" href="../">
						<h1>Content Manager</h1>
					</a>
					<span className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
				</div>
				<div id="navbarMenu" className="navbar-menu">
					<div className="navbar-end">
						<div className=" navbar-item">
							<div className="control has-icons-left">
								<input className="input is-rounded" type="email" placeholder="Search"/>
								<span className="icon is-left">
                    <i className="fa fa-search"></i>
                  </span>
							</div>
						</div>
						<Link href="/landingpage">
						<a className="navbar-item is-active is-size-5 has-text-weight-semibold">
							Home
						</a>
						</Link>
						{(user.email == null) &&<Link href="/login">
							 <a className="navbar-item is-size-5 has-text-weight-semibold">
							Login
						</a>
						</Link>}

						{user.email != null && <Link href="/landingpage">
							<a onClick={logOut} className="navbar-item is-size-5 has-text-weight-semibold">
							Logout </a>
						</Link>}

						<a className="navbar-item is-size-5 has-text-weight-semibold">
							Feature
						</a>

					</div>
				</div>
			</div>
		</nav>
	);

}

export default Navbar;