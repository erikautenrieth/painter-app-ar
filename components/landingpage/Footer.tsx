import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import React from "react";

const Footer = () => {

	return (
		<footer className="footer">
			<div className="content has-text-centered">
				<p>
					<strong>WebXR Projekt</strong> von <a href="https://example.com">Albaraa Abushammala, Erik Autenrieth und Hamed Sadegh </a>
					 <a
					href="components/landingpage/Footer"></a>Der Quellcode ist lizenziert:<a href="http://opensource.org/licenses/mit-license.php"> MIT</a>

					<Typography component="legend">Bewerte das Projekt</Typography>
					<Rating name="no-value" value={null} />
				</p>
			</div>
		</footer>
	);

}

export default Footer;