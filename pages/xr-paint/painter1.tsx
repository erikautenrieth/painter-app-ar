import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";

const Painter1: React.FC = () => {
  const { gl, scene } = useThree();
  let camera: any;
  let controller: any;
  let painter: any;
  const cursor = new THREE.Vector3();
  const [userDataSelecting, setUserDataSelecting] = useState<boolean>(false);
  const init = () => {
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );

    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(window.innerWidth, window.innerHeight);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0, 1, 0);
    scene.add(light);

    painter = new TubePainter();
    painter.setSize(0.4);
    painter.mesh.material.side = THREE.DoubleSide;
    painter.mesh.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    scene.add(painter.mesh);

    function onSelectStart(this: any) {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
      setUserDataSelecting(true);
    }

    function onSelectEnd(this: any) {
      this.userData.isSelecting = false;
      setUserDataSelecting(false);
    }
    controller = gl.xr.getController(0);
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    controller.userData.skipFrames = 0;
    controller.userData.painter = painter;
    scene.add(controller);

    window.addEventListener("resize", onWindowResize);
  };

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    gl.setSize(window.innerWidth, window.innerHeight);
  }
  const handleController = (ctl: any) => {
    if (ctl) {
      const userData = ctl.userData;
      const painter = userData.painter;
      cursor.set(0, 0, -0.2).applyMatrix4(ctl.matrixWorld);

      if (userDataSelecting === true) {
        if (userData.skipFrames >= -1) {
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
  }, [userDataSelecting]);

  useFrame(() => {
    if (controller) {
      handleController(controller);
      gl.render(scene, camera);
    }
  });
  return <></>;
};

export default Painter1;
