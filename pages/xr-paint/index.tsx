import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ARButton, Controllers, XR } from "@react-three/xr";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Matrix4, Object3D, Scene } from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
const Painter = () => {
  const { gl, scene, camera, size } = useThree();
  let controller: any;
  let painter: any;
  const cursor = new THREE.Vector3();
  const virtualScene = useMemo(() => new Scene(), []);
  const virtualCam = useRef();
  const ref = useRef();
  // const [hover, set] = useState(null);
  const matrix = new Matrix4();
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
    cursor.set(0, 0, -0.2).applyMatrix4(controller.matrixWorld);
    function onSelectStart(this: any) {
      // this.userData.isSelecting = true;
      // this.userData.skipFrames = 2;
      console.log(cursor);

      painter.lineTo(cursor);
      painter.update();
    }

    function onSelectEnd(this: any) {
      // this.userData.isSelecting = false;
      painter.moveTo(cursor);
    }
  };

  const handleController = (ctl?: any) => {
    if (controller) {
      const userData = controller.userData;
      console.log(userData);

      cursor.set(0, 0, -0.2).applyMatrix4(controller.matrixWorld);

      if (userData.isSelecting === true) {
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
    // handleController();
  }, []);
  function animate() {
    gl.setAnimationLoop(render);
  }
  useFrame(() => {
    // handleController(controller);
  });

  function render() {
    // handleController(controller);

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
          {/* <mesh ref={meshRef}>
          <meshBasicMaterial ref={meshMaterialRef}></meshBasicMaterial>
        </mesh> */}
          <Painter></Painter>
        </XR>
      </Canvas>
    </div>
  );
};

export default PaintXR;
