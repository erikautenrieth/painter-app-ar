import React from "react";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

export default function AnimatedSphere2() {
	return (
		<Sphere visible args={[1, 100, 200]} scale={1.5}>
	<MeshDistortMaterial
		color="#8772FD"
		attach="material"
		distort={0.7}
		speed={7.5}
		roughness={0}
	/>
	</Sphere>
);
}
