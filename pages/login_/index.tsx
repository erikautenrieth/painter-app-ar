export default function Home() {

	return (
		<>
			<section className="hero is-success is-fullheight">
				<div className="hero-body">
					<div className="container has-text-centered">
						<div className="column is-4 is-offset-4">
							<h3 className="title has-text-black">Login</h3>
							<hr className="login-hr" />
								<p className="subtitle has-text-black">Please login to proceed.</p>
								<div className="box">
									<figure className="avatar">
										<img src="https://via.placeholder.com/150"/>
									</figure>
									<form>
										<div className="field">
											<div className="control">
												<input className="input is-large" type="email" placeholder="Your Email"
													    />
											</div>
										</div>

										<div className="field">
											<div className="control">
												<input className="input is-large" type="password"
													   placeholder="Your Password"/>
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
			</section>
			<script async type="text/javascript" src="../js/bulma.js"></script>
		</>
	);
}