import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {Canvas, useFrame} from "@react-three/fiber";
import Playerpicture from "./playerpicture";


const Model = ({ url }: { url: string }) => {
	const modelRef = useRef<THREE.Object3D | undefined>();
	const [model, setModel] = useState<THREE.AnimationMixer | null>(null);

	useEffect(() => {
		new FBXLoader().load(url, object => {
			object.scale.set(4, 4, 4);
			object.traverse(function(child: THREE.Object3D) {
				if (child instanceof THREE.Mesh) {
					child.castShadow = true;
					child.receiveShadow = true;
					(child.material as THREE.MeshBasicMaterial).color.set(0x666666);
				}
			});

			modelRef.current = object;
			const mixer = new THREE.AnimationMixer(object);
			mixer.clipAction(object.animations[0]).play();
			setModel(mixer);
		});
	}, [url]);

	useFrame((state, delta) => {
		if (model) {
			model.update(delta);
		}
	});

	return modelRef.current ? <primitive object={modelRef.current} /> : null;
};

const Playeranimation = ({ name, ready }: { name: string; ready: boolean }) => {
		if (ready) {
			return (
			<Canvas>
					<Model url={`/models/${name}.fbx`} />
			</Canvas>
			)
		}else {
			return (
				<Playerpicture name={name}/>
			)
		}
};

export default Playeranimation;