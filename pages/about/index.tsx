import Navbar from "../../shared-components/components/navbar/Navbar";

export default function About() {
    const linkedInLinks = {
        Albaraa: "https://www.linkedin.com/in/albaraa-abushammala-07809b1b4/",
        Erik: "https://www.linkedin.com/in/erik-autenrieth-b603a114a/",
        Hamed: "https://www.linkedin.com/in/hamed-sadegh/"
    };

    return (
        <>
            <head>
                <title>About Us - 3D Painter App</title>
                <style></style>
            </head>
            <body className="bodyAbout">
            <Navbar />
            <h1>About Us</h1>
            <p>
                Wir sind drei HBRS Master Informatik Studenten, die eine 3D Painter
                App entwickelt haben.
            </p>
            <div className="containerAbout">
                <div className="cardAbout">
                    <h2>Albaraa Abushammala</h2>
                    <p>
                        Ich bin ein leidenschaftlicher Entwickler und ein Fan von
                        VR-Technologie.
                    </p>
                    <a href={linkedInLinks.Albaraa} target="_blank" rel="noopener noreferrer">
                        Mehr über mich auf LinkedIn
                    </a>
                </div>
                <div className="cardAbout">
                    <h2>Erik Autenrieth</h2>
                    <p>
                        Ich bin ein begeisterter Programmierer und interessiere mich für
                        AI und Machine Learning.
                    </p>
                    <a href={linkedInLinks.Erik} target="_blank" rel="noopener noreferrer">
                        Mehr über mich auf LinkedIn
                    </a>
                </div>
                <div className="cardAbout">
                    <h2>Hamed Sadegh</h2>
                    <p>
                        Ich liebe es, kreative Lösungen für komplexe Probleme zu finden.
                    </p>
                    <a href={linkedInLinks.Hamed} target="_blank" rel="noopener noreferrer">
                        Mehr über mich auf LinkedIn
                    </a>
                </div>
            </div>
            </body>
        </>
    );
}

// <img src="albaraa.jpg" alt="Albaraa Abushammala">, <img src="erik.jpg" alt="Erik Autenrieth">, <img src="hamed.jpg" alt="Hamed Sadegh">