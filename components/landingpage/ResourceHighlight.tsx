import Typed from "react-typed";

const ResourceHighlight = () => {
	const roles = ["WebXR", "React", "Next.js", "Love", "Draw", "Team Work"]
	return (
		<section className="hero ">
			<div className="hero-body">
				<div className="container">
					<section className="section">
						<div className="columns">
							<div className="column is-8 is-offset-2">
								<div className="content is-medium">
									<h2 className="subtitle is-4">December 25, 2018</h2>
									<h1 className="title">Getting Started</h1>
									<p>This is a starter template for creating a beautiful, customizable blog with
										minimal
										effort.</p>
									<Typed
										loop
										typeSpeed={20}
										backSpeed={70}
										strings={roles}
										backDelay={3000}
										loopCount={0}
										showCursor
										className="self-typed"
										cursorChar="|"
									/>
								</div>
							</div>
						</div>
					</section>

					<div className="is-divider"></div>

					<section className="section">
						<div className="columns">
							<div className="column is-8 is-offset-2">
								<div className="content is-medium">
									<h2 className="subtitle is-4">December 25, 2018</h2>
									<h1 className="title">Getting Started</h1>
									<p>This is a starter template for creating a beautiful, customizable blog with
										minimal
										effort. You’ll only have to change a few settings and you’re ready to go. As
										with all Jigsaw sites,
										configuration settings can be found in config</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</section>
	)
}

export default ResourceHighlight;