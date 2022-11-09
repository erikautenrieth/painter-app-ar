import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three"
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";

const Painter1: React.FC = () => {
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
  return <></>;
};

export default Painter1;
