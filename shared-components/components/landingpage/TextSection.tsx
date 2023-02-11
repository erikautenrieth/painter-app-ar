// @ts-ignore
import styled from "styled-components";
import AnimatedSphere from "./AnimatedSphere";
import AnimatedSphere2 from "./AnimatedSphere2";
import {OrbitControls} from "@react-three/drei";
import {Suspense} from "react";
import {Canvas} from "@react-three/fiber";
import Typed from "react-typed";


export default function TextSection() {
	const roles = ["WebXR", "React", "Next.js", "Love", "Draw", "Team Work"]
	return (

		<Wrapper>
			<Title>3D Painting APP</Title>
			<Description>
				Es ist wirklich wundervoll, wie die Technologie es uns heute ermöglicht, auf innovative und unterhaltsame Weise zusammenzuarbeiten und kreativ zu sein.
				Mit unserer neuen Web App können Sie zusammen mit einem Freund oder einem Kollegen an einer 3D-Zeichnung arbeiten.
			</Description>

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

			<Canvas className="canvas">
				<OrbitControls enableZoom={false} />
				<ambientLight intensity={0.5} />
				<directionalLight position={[-2, 5, 2]} />
				<Suspense fallback={null}>
					<AnimatedSphere />
				</Suspense>
			</Canvas>
			<Title>Erste Schritte</Title>
			<Description>
				Die App bietet eine Vielzahl von Werkzeugen und Funktionen, die es Ihnen ermöglichen, Ihrer Kreativität freien Lauf zu lassen und wirklich beeindruckende Ergebnisse zu erzielen. Ob Sie nun ein erfahrener 3D-Künstler sind oder gerade erst damit anfangen,
				Sie werden sicherlich viel Spaß haben, während Sie gemeinsam an Ihrem Projekt arbeiten.
			</Description>
			<Canvas className="canvas">
				<OrbitControls enableZoom={false} />
				<ambientLight intensity={0.5} />
				<directionalLight position={[-2, 5, 2]} />
				<Suspense fallback={null}>
					<AnimatedSphere2 />
				</Suspense>
			</Canvas>

			<Title>Los gehts</Title>
			<Description>
				Die Benutzeroberfläche ist intuitiv und einfach zu bedienen, sodass Sie schnell in die App hineinfinden und loslegen können. Sie werden überrascht sein, wie schnell Sie Fortschritte machen und wie viel Spaß es macht, zusammenzuarbeiten und Ideen auszutauschen.

				Also warum zögern Sie noch? Laden Sie jetzt unsere Web App herunter und starten Sie noch heute mit der Zusammenarbeit an Ihrer nächsten 3D-Zeichnung. Sie werden es nicht bereuen!
			</Description>
		</Wrapper>

	);
}

const Wrapper = styled.div`
  position: relative;
  max-width: 2000px;
  display: grid;
  gap: 20px;
  text-align: center;
  margin: 0 auto;
  padding: 140px 20px 100px;
`;

const Title = styled.h1`
  color: rgba(255, 255, 255, 1);
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
`;

const Description = styled.p`
  max-width: 1000px;
  color: rgba(255, 255, 255, 0.7);
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 130%;
  margin: 0 auto;
`;
