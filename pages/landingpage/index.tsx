import Footer from "components/landingpage/Footer";
import Navbar from "components/landingpage/Navbar";
import ResourceHighlight from "components/landingpage/ResourceHighlight";
import Newsletter from "components/landingpage/Newsletter";
import ResourceList from "components/landingpage/ResourceList";

import Head from 'next/head'

export default function Home() {
	  return (
	<>
		<Head>
			<title>Real Chat App</title>
			<link rel="icon" href="/message_draw_icon.ico" />
		</Head>

	  <Navbar />
	  <ResourceHighlight />
	  <ResourceList />
	  <Newsletter />
	  <Footer />
	</>
  );
}