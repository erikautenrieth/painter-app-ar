import Footer from "components/landingpage/Footer";
import Navbar from "components/landingpage/Navbar";
import ResourceHighlight from "components/landingpage/ResourceHighlight";
import Newsletter from "components/landingpage/Newsletter";
import ResourceList from "components/landingpage/ResourceList";


export default function Home() {
	  return (
	<>
	  <Navbar />
	  <ResourceHighlight />
	  <ResourceList />
	  <Newsletter />
	  <Footer />
	</>
  );
}