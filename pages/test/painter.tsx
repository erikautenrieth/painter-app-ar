import { useEffect } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

const Tube_Painter = () => {
  let container;
  let camera: any, scene: any, renderer: any;
  let controller: any, painter: any;
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

    painter = new TubePainter();
    painter.setSize(0.4);
    painter.mesh.material.side = THREE.DoubleSide;
    scene.add(painter.mesh);

    //

    function onSelectStart(this: any) {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
    }

    function onSelectEnd(this: any) {
      this.userData.isSelecting = false;
    }

    controller = renderer.xr.getController(0);
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    controller.userData.skipFrames = 0;
    scene.add(controller);

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
    const userData = controller.userData;

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

  function animate() {
    renderer.setAnimationLoop(render);
  }

  function render() {
    handleController(controller);

    renderer.render(scene, camera);
  }
  return <div id="container-id" className="container"></div>;
};

export default Tube_Painter;
