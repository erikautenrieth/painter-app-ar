import Navbar from "../../shared-components/components/navbar/Navbar";


export default function About()  {
  return (
      <>
        <head>
          <title>About Us - 3D Painter App</title>
          <style></style>
        </head>
          <Navbar />
        <body className="bodyAbout">
        <h1>About Us</h1>
        <p>Wir sind drei HBRS Master Informatik Studenten, die eine 3D Painter App entwickelt haben.</p>
        <div className="containerAbout">
          <div className="cardAbout">
              <h2>Albaraa Abushammala</h2>
              <p>Ich bin ein leidenschaftlicher Entwickler und ein Fan von VR-Technologie.</p>
              <a href="#">Mehr über mich</a>
          </div>
          <div className="cardAbout">
              <h2>Erik Autenrieth</h2>
              <p>Ich bin ein begeisterter Programmierer und interessiere mich für AI und Machine Learning.</p>
              <a href="#">Mehr über mich</a>
          </div>
          <div className="cardAbout">
              <h2>Hamed Sadegh</h2>
              <p>Ich liebe es, kreative Lösungen für komplexe Probleme zu finden.</p>
              <a href="#">Mehr über mich</a>
          </div>
        </div>
        </body>
      </>
);
};

// <img src="albaraa.jpg" alt="Albaraa Abushammala">, <img src="erik.jpg" alt="Erik Autenrieth">, <img src="hamed.jpg" alt="Hamed Sadegh">