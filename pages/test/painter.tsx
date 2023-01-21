import { useEffect } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

const Tube_Painter = () => {
  let container;
  let camera: any, scene: any, renderer: any;
  let controller1: any, controller2: any, painter1: any, painter2: any;
  const cursor = new THREE.Vector3();
  useEffect(() => {
    init();
    animate();
  }, []);

  function init() {
    // container = document.createElement("div");
    container = document.getElementById("container-id");
    if (container) {
      document.body.appendChild(container);
    }

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );

    //

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    if (container) {
      container.appendChild(renderer.domElement);
    }

    //

    document.body.appendChild(ARButton.createButton(renderer));

    // model

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0, 1, 0);
    scene.add(light);

    //

    painter1 = new TubePainter();
    painter1.setSize(0.6);
    painter1.mesh.material.side = THREE.DoubleSide;
    painter1.mesh.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    scene.add(painter1.mesh);

    painter2 = new TubePainter();
    painter2.setSize(0.6);
    painter2.mesh.material.side = THREE.DoubleSide;
    painter2.mesh.material = new THREE.MeshBasicMaterial({ color: 0x08f3ff });
    scene.add(painter2.mesh);
    //

    function onSelectStart(this: any) {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
    }

    function onSelectEnd(this: any) {
      this.userData.isSelecting = false;
    }

    controller1 = renderer.xr.getController(0);
    controller1.addEventListener("selectstart", onSelectStart);
    controller1.addEventListener("selectend", onSelectEnd);
    controller1.userData.skipFrames = 0;
    controller1.userData.painter = painter1;
    scene.add(controller1);

    controller2 = renderer.xr.getController(0);
    controller2.addEventListener("selectstart", onSelectStart);
    controller2.addEventListener("selectend", onSelectEnd);
    controller2.userData.skipFrames = 0;
    controller2.userData.painter = painter2;
    scene.add(controller2);

    //

    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  //

  function handleController(controller: any) {
    if (controller) {
      const userData = controller.userData;
      const painter = userData.painter;

      cursor.set(0, 0, -0.2).applyMatrix4(controller.matrixWorld);

      if (userData.isSelecting === true) {
        if (userData.skipFrames >= 0) {
          // TODO(mrdoob) Revisit this

          userData.skipFrames--;

          painter.moveTo(cursor);
        } else {
          painter.lineTo(cursor);
          painter.update();
        }
      }
    }
  }

  function animate() {
    renderer.setAnimationLoop(render);
  }

  function render() {
    handleController(controller1);
    handleController(controller2);
    renderer.render(scene, camera);
  }
  return <div id="container-id" className="containerCanva"></div>;
};

export default Tube_Painter;
