import Typed from "react-typed";

const ResourceList = () => {
	return (
		<section className="hero ">
			<div className="hero-body">
				<div className="container">
					<section className="section">
						<div className="columns is-variable is-8">
							<div className="column is-5 is-offset-1 ">
								<div className="content is-medium">
									<h2 className="subtitle is-5 has-text-grey">Dezember 05, 2022</h2>
									<h1 className="title has-text-black is-3">Feature</h1>
									<p className="has-text-dark">Wir freuen uns, Ihnen mitteilen zu können, dass wir ein brandneues Feature in unserer 3D Zeichen App hinzugefügt haben!
										Ab sofort haben Sie die Möglichkeit, Ihre Zeichnungen in Echtzeit mit Freunden oder Kollegen zu teilen und gemeinsam daran zu arbeiten.</p>
								</div>
							</div>
							<div className="column is-5">
								<div className="content is-medium">
									<h2 className="subtitle is-5 has-text-grey">Dezember 12, 2022</h2>
									<h1 className="title has-text-black is-3">Hosten</h1>
									<p className="has-text-dark">
										Unsere 3D Zeichen App hat ein neues Feature: das Hosten von Projekten. Sie können nun Ihre Zeichnungen online teilen und mit der ganzen Welt präsentieren.
										Einfach veröffentlichen und den Link teilen. Schauen Sie sich die Zeichnungen anderer an und lassen Sie sich inspirieren!
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</section>
	);
}

export default ResourceList;