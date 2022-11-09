import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
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
    camera.position.set(0, 1.6, 3);

    controller = gl.xr.getController(0);
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    controller.addEventListener("squeezestart", onSqueezeStart);
    controller.addEventListener("squeezeend", onSqueezeEnd);
    controller.userData.skipFrames = 0;
    scene.add(controller);

    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(window.innerWidth, window.innerHeight);

    // model

    const light = new THREE.HemisphereLight(0xf02213, 0x6ff013, 1);
    light.position.set(0, 4, 0);
    scene.add(light);

    painter = new TubePainter();
    painter.setSize(0.4);
    painter.mesh.material.side = THREE.DoubleSide;
    painter.mesh.material.color.r = 235;
    painter.mesh.material.color.g = 52;
    painter.mesh.material.color.b = 85;

    painter.mesh.material.emissive.r = 235;
    painter.mesh.material.emissive.g = 52;
    painter.mesh.material.emissive.b = 85;
    // painter.mesh.material.color(255, 0, 0)
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

    function onSqueezeStart(this: any) {
      this.userData.isSqueezing = true;
      this.userData.positionAtSqueezeStart = this.position.y;
      this.userData.scaleAtSqueezeStart = this.scale.x;
    }

    function onSqueezeEnd(this: any) {
      this.userData.isSqueezing = false;
    }

    const geometry = new THREE.CylinderGeometry(0.01, 0.02, 0.08, 5);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshStandardMaterial({ flatShading: true });
    const mesh = new THREE.Mesh(geometry, material);

    const pivot = new THREE.Mesh(new THREE.IcosahedronGeometry(0.01, 3));
    pivot.name = "pivot";
    pivot.position.z = -0.05;
    mesh.add(pivot);

    controller.add(mesh.clone());

    window.addEventListener("resize", onWindowResize);
  };
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    gl.setSize(window.innerWidth, window.innerHeight);
  }

  // const handleController = (ctl?: any) => {
  //   const userData = ctl.userData;
  //   cursor.set(0, 0, -0.2).applyMatrix4(ctl.matrixWorld);

  //   if (userDataSelecting === true) {
  //     if (userData.skipFrames >= 0) {
  //       // TODO(mrdoob) Revisit thi

  //       userData.skipFrames--;

  //       painter.moveTo(cursor);
  //     } else {
  //       painter.lineTo(cursor);
  //       painter.update();
  //     }
  //   }
  // };

  function handleController(controller?: any) {
    const userData = controller.userData;
    const painter = userData.painter;

    const pivot = controller.getObjectByName("pivot");

    if (userData.isSqueezing === true) {
      const delta =
        (controller.position.y - userData.positionAtSqueezeStart) * 5;
      const scale = Math.max(0.1, userData.scaleAtSqueezeStart + delta);

      pivot.scale.setScalar(scale);
      painter.setSize(scale);
    }

    cursor.setFromMatrixPosition(pivot.matrixWorld);

    if (painter) {
      if (userData.isSelecting === true) {
        painter.lineTo(cursor);
        painter.update();
      } else {
        painter.moveTo(cursor);
      }
    }
  }
  useEffect(() => {
    init();
    // animate();
  }, [userDataSelecting]);

  useFrame(() => {
    if (controller) {
      handleController(controller);
      gl.render(scene, camera);
    }
  }, 1);
  // function animate() {
  //   gl.setAnimationLoop(render);
  // }
  // function render() {
  //   handleController(controller);
  //   gl.render(scene, camera);
  // }
  return <></>;
};

export default Painter1;
