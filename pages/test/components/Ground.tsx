const Ground: React.FC = () => {
  return (
    <>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[1000, 1000]}></planeGeometry>
        <meshLambertMaterial color={"green"}></meshLambertMaterial>
      </mesh>
    </>
  );
};
export default Ground;
