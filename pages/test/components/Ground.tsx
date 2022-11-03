import { useTexture } from "@react-three/drei";

const Ground: React.FC = () => {
  const props = useTexture({
    map: "/ground/coast_sand_rocks_02_diff_1k.png",
    // displacementMap: "/ground/coast_sand_rocks_02_disp_1k.png",
    normalMap: "/ground/coast_sand_rocks_02_nor_gl_1k.png",
    roughnessMap: "/ground/coast_sand_rocks_02_rough_1k.png",
  });
  return (
    <>
      <mesh
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]}></planeGeometry>
        <meshStandardMaterial {...props}></meshStandardMaterial>
      </mesh>
    </>
  );
};
export default Ground;
