import Link from "next/link"
import {useAuth} from "../../shared-components/services/auth-context";

const Navbar = () => {
	const { user, login, logOut } = useAuth();
	return (
		<nav className="navbar">
					<div className="navbarsmall">
						{user.email != null && <Link href="/home">
						<a className="navbar-item is-active is-size-5 has-text-weight-semibold">
							Home
						</a>
						</Link>}

						{(user.email == null)  &&<Link href="/login">
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
		</nav>
	);

}

export default Navbar;