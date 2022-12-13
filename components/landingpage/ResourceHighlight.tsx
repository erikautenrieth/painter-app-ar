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
									<h2 className="subtitle is-4">Punkt 1</h2>
									<h1 className="title">Projekt </h1>
									<p> Hier entsteht ein Text über das wundervolle Projekt und welche Mentalität die Begründer des Projektes an den Tag legen. Vor allem  soll Liebe zum Programmieren herausstechen.</p>
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
									<h2 className="subtitle is-4">Erste Schritte</h2>
									<h1 className="title">Erste Schritte</h1>
									<p>Hier entsteht ein Text über die Funktionsweisen der App und wie gestartet werden kann.
									</p>
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