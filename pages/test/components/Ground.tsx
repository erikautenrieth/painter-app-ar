const Ground: React.FC = () => {
  return (
    <>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        receiveShadow
      >
        <planeBufferGeometry args={[1000, 1000]}></planeBufferGeometry>
        <meshLambertMaterial color={"green"}></meshLambertMaterial>
      </mesh>
    </>
  );
};
export default Ground;
