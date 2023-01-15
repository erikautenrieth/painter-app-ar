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
									<h2 className="subtitle is-4">Real Chat </h2>
									<h1 className="title">3D Painting </h1>
									<p>
										Es ist wirklich wundervoll, wie die Technologie es uns heute ermöglicht, auf innovative und unterhaltsame Weise zusammenzuarbeiten und kreativ zu sein.
										Mit unserer neuen Web App können Sie zusammen mit einem Freund oder einem Kollegen an einer 3D-Zeichnung arbeiten.</p>
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
									<h2 className="subtitle is-4">Projekt</h2>
									<h1 className="title">Erste Schritte</h1>
									<p >
										Die App bietet eine Vielzahl von Werkzeugen und Funktionen, die es Ihnen ermöglichen, Ihrer Kreativität freien Lauf zu lassen und wirklich beeindruckende Ergebnisse zu erzielen. Ob Sie nun ein erfahrener 3D-Künstler sind oder gerade erst damit anfangen, Sie werden sicherlich viel Spaß haben, während Sie gemeinsam an Ihrem Projekt arbeiten.
									</p>
								</div>
							</div>
						</div>
					</section>

					<section className="section">
						<div className="columns">
							<div className="column is-8 is-offset-2">
								<div className="content is-medium">
									<h2 className="subtitle is-4">Start</h2>
									<h1 className="title">Los gehts</h1>
									<p >Die Benutzeroberfläche ist intuitiv und einfach zu bedienen, sodass Sie schnell in die App hineinfinden und loslegen können. Sie werden überrascht sein, wie schnell Sie Fortschritte machen und wie viel Spaß es macht, zusammenzuarbeiten und Ideen auszutauschen.

										Also warum zögern Sie noch? Laden Sie jetzt unsere Web App herunter und starten Sie noch heute mit der Zusammenarbeit an Ihrer nächsten 3D-Zeichnung. Sie werden es nicht bereuen!
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