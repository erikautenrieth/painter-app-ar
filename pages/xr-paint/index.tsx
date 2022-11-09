import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
const Painter = () => {
  const { gl, scene, camera, size } = useThree();
  let controller: any;
  let painter: any;
  const cursor = new THREE.Vector3();
  const [userDataSelecting, setUserDataSelecting] = useState<boolean>(false);
  const init = () => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(window.innerWidth, window.innerHeight);

    painter = new TubePainter();
    painter.setSize(0.4);
    painter.mesh.material.side = THREE.DoubleSide;
    scene.add(painter.mesh);

    controller = gl.xr.getController(0);
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    controller.userData.skipFrames = 0;
    scene.add(controller);
    function onSelectStart(this: any) {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
      setUserDataSelecting(true);
    }

    function onSelectEnd(this: any) {
      this.userData.isSelecting = false;
      setUserDataSelecting(false);
    }
  };

  const handleController = (ctl?: any) => {
    if (controller) {
      const userData = ctl.userData;
      cursor.set(0, 0, -0.2).applyMatrix4(ctl.matrixWorld);

      if (userDataSelecting) {
        if (userData.skipFrames >= 0) {
          // TODO(mrdoob) Revisit thi

          userData.skipFrames--;

          painter.moveTo(cursor);
        } else {
          painter.lineTo(cursor);
          painter.update();
        }
      }
    }
  };
  useEffect(() => {
    init();
    animate();
  }, [userDataSelecting]);

  function animate() {
    gl.setAnimationLoop(render);
  }
  function render() {
    handleController(controller);
    gl.render(scene, camera);
  }
  return <mesh></mesh>;
};
const PaintXR = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const lightRef = useRef<THREE.HemisphereLight>(null);
  const init = () => {
    if (cameraRef.current) {
      cameraRef.current.fov = 70;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.near = 0.01;
      cameraRef.current.far = 20;
    }

    window.addEventListener("resize", onWindowResize);
  };

  const onWindowResize = () => {
    if (cameraRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
    }
  };
  useEffect(() => {
    init();
  });
  return (
    <div className="containerCanva">
      <ARButton></ARButton>
      <Canvas>
        <XR>
          <PerspectiveCamera ref={cameraRef}></PerspectiveCamera>
          <hemisphereLight
            args={["0xffffff", "0xbbbbff", 1]}
            ref={lightRef}
          ></hemisphereLight>
          <Painter></Painter>
        </XR>
      </Canvas>
    </div>
  );
};

export default PaintXR;
