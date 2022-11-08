import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import React from "react";

const Footer = () => {

	return (
		<footer className="footer">
			<div className="content has-text-centered">
				<p>
					<strong>WebXR Projekt</strong> by <a href="https://example.com">Albaraa Abushammala, Erik Autenrieth and  Hamed Sadegh </a>....

					 <a
					href="components/landingpage/Footer">...</a>. The source code is licensed
					<a href="http://opensource.org/licenses/mit-license.php"> MIT</a>
					<Typography component="legend">Give Rating</Typography>
					<Rating name="no-value" value={null} />
				</p>
			</div>
		</footer>
	);

}

export default Footer;