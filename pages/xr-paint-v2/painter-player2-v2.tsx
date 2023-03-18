import { IColor } from "shared-components/interfaces/host.interface";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

type Props = {
  hostingId: string | undefined;
  color: IColor;
  colorPlayer1: IColor;
  size: number;
  sizePlayer1: number;
};
const PainterPlayer2V2: React.FC<Props> = ({
  hostingId,
  color,
  colorPlayer1,
  size,
  sizePlayer1,
}) => {
  let container;
  let camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer;
  let controller: THREE.Object3D<THREE.Event> | THREE.XRTargetRaySpace,
    painter: any;

  const cursor = new THREE.Vector3();

  init();
  animate();

  function init() {
    container = document.createElement("div");
    document.body.appendChild(container);

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
    container.appendChild(renderer.domElement);

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
    if (controller) {
      handleController(controller);

      renderer.render(scene, camera);
    }
  }
  return (
    <>
      <h1>Hamedkabir</h1>
    </>
  );
};
export default PainterPlayer2V2;
