import { Button, TextField } from "@mui/material";

import "firebaseui/dist/firebaseui.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "shared-components/services/auth-context";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import styles from '../../styles/Home.module.css';



/* <input className="input is-large" type="email" placeholder="Your Email"/>
  	<input className="input is-large" type="password" placeholder="Your Password"/>
  	<img src="https://via.placeholder.com/150"/>
 */

export default function Login() {

	const router = useRouter();
	const { user, login } = useAuth();
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	function goToPage(rout: string) {router.push(rout);}

	const handleLogin = async (e: any) => {
		e.preventDefault();

		try {
			await login(data.email, data.password);
			goToPage("/home");
		} catch (err) {
			console.log(err);
		}
	};
	const [value, setValue] = React.useState(2);


	return (
		<>
			<section className={styles.title}>
				<div className="hero-body">
					<div className="container has-text-centered">
						<div className="column is-4 is-offset-4">
							<h3 className="title has-text-black">Login</h3>
							<hr className="login-hr" />
								<p className="subtitle has-text-black">Please login to proceed.</p>
								<div className="box">
									<figure className="avatar">
										<img src="https://www.thispersondoesnotexist.com/image" height="150px" width={"150px"}/>
									</figure>

									<form onSubmit={handleLogin}>
										<div className="field">
											<div className="control">
												<TextField
													sx={{ color: 'blue' } }focused
													margin="normal"
													type={"email"}
													label="Username"
													variant="outlined"

													required
													onChange={(e: any) => setData({...data, email: e.target.value,})}

													/>

											</div>
										</div>

										<div className="field">
											<div className="control">

												<TextField
													sx={{ color: 'blue' } }focused
													margin="normal"
													type={"password"}
													label="Password"
													variant="outlined"
													required
													onChange={(e: any) =>
														setData({
															...data,
															password: e.target.value,
														})
													}
												/>

											</div>
										</div>
										<div className="field">
											<label className="checkbox">
												<input type="checkbox"/>
													Remember me
											</label>
										</div>
										<button className="button is-block is-info is-large is-fullwidth">Login <i
											className="fa fa-sign-in" aria-hidden="true"></i></button>
									</form>
								</div>
								<p className="has-text-grey">
									<a href="../">Sign Up</a> &nbsp;·&nbsp;
									<a href="../">Forgot Password</a> &nbsp;·&nbsp;
									<a href="../">Need Help?</a>
								</p>
						</div>
					</div>
				</div>

				<Button variant="outlined" onClick={() => goToPage("/test")}>
					XR Test
				</Button>

			</section>
			<script async type="text/javascript" src="../js/bulma.js"></script>
		</>
	);
}