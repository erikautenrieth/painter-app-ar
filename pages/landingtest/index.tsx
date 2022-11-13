


export default function Landingtest() {




return (

	<>
	<head>
		<meta charSet="utf-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<title>Parallax - Free Bulma template</title>
		<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;800&display=swap"
			  rel="stylesheet"/>

		<link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css"/>
		<link rel="stylesheet" type="text/css" href="../css/hello-parallax.css/"/>
	</head>


<body>
<section className="hero is-medium">
	<div className="hero-body">
		<div className="container">
			<h1 className="title is-1 ">Hello Parallax</h1>
			<h2 className="subtitle">A simple boilerplate for setting up parallax <br/> using the Bulma Hero container.
			</h2>
			<a href="#" className="button is-white is-medium is-inverted">Learn More&ensp;<i
				className="fad fa-chevron-right"></i></a>
		</div>
	</div>
</section>
<section id="parallax-1" className="hero is-large ">
	<div className="hero-body">
		<div className="container">
			<div className="columns">
				<div className="column is-6 is-offset-6">
					<h1 className="title is-1 ">Lorem Ipsum</h1>
					<hr className="content-divider"/>
						<h2 className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
							explicabo amet magni illum eum voluptate! Eveniet voluptatem nam magnam necessitatibus.</h2>
						<a href="#" className="button is-white is-inverted">Next&ensp;<i
							className="fad fa-chevron-right"></i></a>
				</div>
			</div>
		</div>
	</div>
</section>
<section id="parallax-2" className="hero is-large ">
	<div className="hero-body">
		<div className="container">
			<div className="columns">
				<div className="column is-6">
					<h1 className="title is-1 ">Dolor Sit</h1>
					<hr className="content-divider"/>
						<h2 className="subtitle">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
							veritatis sequi natus minima distinctio ullam deleniti quasi quisquam autem deserunt.</h2>
						<a href="#" className="button is-white is-inverted">Next&ensp;<i
							className="fad fa-chevron-right"></i></a>
				</div>
			</div>
		</div>
	</div>
</section>
<section id="parallax-3" className="hero is-large ">
	<div className="hero-body">
		<div className="container">
			<div className="columns">
				<div className="column is-6 is-offset-6">
					<h1 className="title is-1 ">Amet Consectetur</h1>
					<hr className="content-divider"/>
						<h2 className="subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure minus
							nam necessitatibus neque in perferendis eveniet dolorum assumenda dolores accusamus.</h2>
						<a href="#" className="button is-white is-inverted">Next&ensp;<i
							className="fad fa-chevron-right"></i></a>
				</div>
			</div>
		</div>
	</div>
</section>
<section className="cta va">
	<div className="container">
		<div className="columns">
			<div className="column is-6">
				<h1 className="title is-1 ">Adipisicing Elit</h1>
				<hr className="content-divider"/>
					<h2 className="subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ut nulla
						maiores, beatae voluptas sunt excepturi deserunt vero. Beatae est ratione quia neque molestias,
						cum asperiores quibusdam rem illum, debitis dolorem natus, eos fuga eveniet numquam ab officia
						reiciendis inventore. Tempore repudiandae exercitationem quisquam? Fugiat!</h2>
			</div>
			<div className="column is-6">
				<div className="field">
					<label className="label">Name</label>
					<div className="control">
						<input className="input is-medium" type="text" placeholder="Jon Snow"/>
					</div>
				</div>
				<br/>
					<div className="field">
						<label className="label">Email</label>
						<div className="control">
							<input className="input is-medium" type="email" placeholder="jon@winterfell.com"/>
						</div>
					</div>
					<br/>
						<div className="field is-grouped">
							<div className="control">
								<button className="button is-white is-rounded is-outlined">Submit</button>
							</div>

						</div>
			</div>
		</div>
	</div>

</section>
<footer className="footer">
	<div className="content has-text-centered">
		<p>
			<strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
			<a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
			is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
		</p>
	</div>
</footer>
</body>
	</>

)}