import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";

const Painter1: React.FC = () => {
  const { gl, scene } = useThree();
  let camera: any;
  let controller1: any, controller2: any;
  let painter1: any, painter2: any;
  const cursor1 = new THREE.Vector3();
  const cursor2 = new THREE.Vector3();
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

    painter1 = new TubePainter();
    painter1.setSize(0.4);
    painter1.mesh.material.side = THREE.DoubleSide;
    painter1.mesh.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    scene.add(painter1.mesh);

    painter2 = new TubePainter();
    painter2.setSize(0.4);
    painter2.mesh.material.side = THREE.DoubleSide;
    painter2.mesh.material = new THREE.MeshBasicMaterial({ color: 0xfcba03 });
    scene.add(painter2.mesh);

    function onSelectStart(this: any) {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
      setUserDataSelecting(true);
    }

    function onSelectEnd(this: any) {
      this.userData.isSelecting = false;
      setUserDataSelecting(false);
    }
    controller1 = gl.xr.getController(0);
    controller1.addEventListener("selectstart", onSelectStart);
    controller1.addEventListener("selectend", onSelectEnd);
    controller1.userData.skipFrames = 0;
    controller1.userData.isSelecting = false;
    controller1.userData.painter = painter1;
    scene.add(controller1);

    controller2 = gl.xr.getController(0);
    controller2.addEventListener("selectstart", onSelectStart);
    controller2.addEventListener("selectend", onSelectEnd);
    controller2.userData.skipFrames = 0;
    controller2.userData.isSelecting = false;
    controller2.userData.painter = painter2;
    scene.add(controller2);

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
      cursor1.set(0, 0, -0.2).applyMatrix4(ctl.matrixWorld);
      if (userDataSelecting === true) {
        if (userData.skipFrames >= -2) {
          // TODO(mrdoob) Revisit thi

          userData.skipFrames--;

          painter.moveTo(cursor1);
        } else {
          painter.lineTo(cursor1);
          painter.update();
        }
      }
    }
  };
  useEffect(() => {
    init();
  }, [userDataSelecting]);

  useFrame(() => {
    if (controller1) {
      handleController(controller1);
      handleController(controller2);
      gl.render(scene, camera);
    }
  });
  return <></>;
};

export default Painter1;
