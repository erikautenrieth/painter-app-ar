import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type palmType = {
  position: { x: number; z: number };
  box: number;
};
type props = {
  boundary: number;
  count: number;
};
const Palm2: React.FC<props> = ({ boundary, count }) => {
  const model = useLoader(GLTFLoader, "/models/Palm.glb");
  const [palms, setPalms] = useState<palmType[]>([]);
  model.scene.traverse((object) => {
    if (object) {
      object.castShadow = true;
    }
  });

  const newPosition = (box: number, boundary: number) => {
    return (
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };

  const boxIntersect = (
    minAx: number,
    minAz: number,
    maxAx: number,
    maxAz: number,
    minBx: number,
    minBz: number,
    maxBx: number,
    maxBz: number
  ) => {
    let aLeftOfB = maxAx < minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;

    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };

  const isOverlapping = (index: number, palm: palmType, palms: palmType[]) => {
    const minTargetX = palm.position.x - palm.box / 2;
    const maxTargetX = palm.position.x + palm.box / 2;
    const minTargetZ = palm.position.z - palm.box / 2;
    const maxTargetZ = palm.position.z + palm.box / 2;
    for (let index = 0; index < index; index++) {
      let minChildX = palms[index].position.x - palms[index].box / 2;
      let maxChildX = palms[index].position.x + palms[index].box / 2;
      let minChildZ = palms[index].position.z - palms[index].box / 2;
      let maxChildZ = palms[index].position.z - palms[index].box / 2;
      if (
        boxIntersect(
          minTargetX,
          minTargetZ,
          maxTargetX,
          maxTargetZ,
          minChildX,
          minChildZ,
          maxChildX,
          maxChildZ
        )
      ) {
        return true;
      }
    }
    return false;
  };

  const updatePosition = (palmArray: palmType[], boundary: number) => {
    palmArray.forEach((palm, index) => {
      do {
        palm.position.x = newPosition(palm.box, boundary);
        palm.position.z = newPosition(palm.box, boundary);
      } while (isOverlapping(index, palm, palmArray));
    });
    setPalms(palmArray);
  };

  useEffect(() => {
    const tempPalms: palmType[] = [];
    for (let index = 0; index < count; index++) {
      tempPalms.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    updatePosition(tempPalms, boundary);
  }, [boundary, count]);
  return (
    <group>
      {palms.map((palm, index) => {
        return (
          <object3D
            key={index}
            position={[palm.position.x, 0, palm.position.z]}
          >
            <mesh scale={[palm.box, palm.box, palm.box]}>
              <boxGeometry></boxGeometry>
              <meshBasicMaterial color={"blue"} wireframe></meshBasicMaterial>
            </mesh>
            <primitive object={model.scene.clone()}></primitive>
          </object3D>
        );
      })}
    </group>
  );
};

export default Palm2;
