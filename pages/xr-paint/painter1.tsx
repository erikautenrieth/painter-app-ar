import { useFrame, useThree } from "@react-three/fiber";
import { database } from "config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
type Props = {
  paintPositionFromDB: any[];
  fakePlayer: string;
};
const Painter1: React.FC<Props> = ({
  paintPositionFromDB,
  fakePlayer,
}: Props) => {
  // const { scene } = useThree();
  let camera: any, gl: any, scene: any;
  let controller: any, controller2: any;
  let painter: any, painter2: any;
  const cursor = new THREE.Vector3();
  const cursor2 = new THREE.Vector3();
  const [userDataSelecting, setUserDataSelecting] = useState<boolean>(false);
  const [userDataSelecting2, setUserDataSelecting2] = useState<boolean>(false);
  const [skipFramePlayer1, setSkipFramePlayer1] = useState<number>(0);
  const [skipFramePlayer2, setSkipFramePlayer2] = useState<number>(0);
  let arrayOfPositions: any[] = paintPositionFromDB;
  const init = () => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20
    );

    gl = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(window.innerWidth, window.innerHeight);
    console.log("hamedkabir  gl ", gl);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0, 1, 0);
    scene.add(light);

    painter = new TubePainter();
    painter.setSize(0.4);
    painter.mesh.material.side = THREE.DoubleSide;
    painter.mesh.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    scene.add(painter.mesh);

    painter2 = new TubePainter();
    painter2.setSize(0.4);
    painter2.mesh.material.side = THREE.DoubleSide;
    painter2.mesh.material = new THREE.MeshBasicMaterial({ color: 0xf5b042 });
    scene.add(painter2.mesh);

    function onSelectStart(this: any) {
      // this.userData.isSelecting = true;
      // this.userData.skipFrames = 2;
      console.log("hamedkabir s ", fakePlayer);
      switch (fakePlayer) {
        case "player1":
          setSkipFramePlayer1(2);
          setUserDataSelecting(true);
          break;

        case "player2":
          setSkipFramePlayer2(2);
          setUserDataSelecting2(true);
          break;

        default:
          break;
      }
    }

    function onSelectEnd(this: any) {
      // this.userData.isSelecting = false;

      // updatePlayerPosition();
      switch (fakePlayer) {
        case "player1":
          setUserDataSelecting(false);
          break;

        case "player2":
          setUserDataSelecting(false);
          break;

        default:
          break;
      }
    }

    controller = gl.xr.getController(0);
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    // controller.userData.skipFrames = 0;
    // controller.userData.painter = painter;
    scene.add(controller);

    controller2 = gl.xr.getController(0);
    controller2.addEventListener("selectstart", onSelectStart);
    controller2.addEventListener("selectend", onSelectEnd);
    // controller2.userData.skipFrames = 0;
    // controller2.userData.painter = painter2;
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
      if (fakePlayer == "player1") {
        // const userData = ctl.userData;
        // const painter = userData.painter;
        cursor.set(0, 0, -0.2).applyMatrix4(ctl.matrixWorld);

        if (userDataSelecting === true) {
          if (skipFramePlayer1 >= -2) {
            // TODO(mrdoob) Revisit thi
            const skipFrameObject = skipFramePlayer1 - 1;
            // userData.skipFrames--;
            setSkipFramePlayer1(skipFrameObject);
            painter.moveTo(cursor);
          } else {
            painter.lineTo(cursor);
            painter.update();
            const object = {
              x: cursor.x,
              y: cursor.y,
              z: cursor.z,
            };
            // arrayOfPositions.push(object);
          }
        }
      } else if (fakePlayer == "player2") {
        // const userData = ctl.userData;
        // const painter = userData.painter;
        cursor2.set(0, 0, -0.2).applyMatrix4(ctl.matrixWorld);
        if (userDataSelecting2 === true) {
          if (skipFramePlayer2 >= -2) {
            // TODO(mrdoob) Revisit thi

            const skipFrameObject = skipFramePlayer2 - 1;
            // userData.skipFrames--;
            setSkipFramePlayer2(skipFrameObject);

            console.log("move", cursor2);
            painter2.moveTo(cursor2);
          } else {
            console.log("linto", cursor2);
            painter2.lineTo(cursor2);
            painter2.update();
            const object = {
              x: cursor.x,
              y: cursor.y,
              z: cursor.z,
            };
            // arrayOfPositions.push(object);
          }
        }
      }
    }
  };
  const updatePlayerPosition = async () => {
    const docKey = "zb5tWRiOArpG0vR5PjO8";

    const docRef = doc(database, `host/${docKey}`);
    await updateDoc(docRef, {
      player1: {
        position: arrayOfPositions,
      },
    });
  };

  let index = 0;
  function paintFromDB() {
    if (index < arrayOfPositions.length) {
      cursor.set(
        arrayOfPositions[index].x,
        arrayOfPositions[index].y,
        arrayOfPositions[index].z
      );
      if (index < 1) {
        painter.moveTo(cursor);
      } else {
        painter.lineTo(cursor);
        painter.update();
      }
      index++;
      paintFromDB();
    } else {
      cursor.set(0, 0, -0.2);
      painter.moveTo(cursor);
    }
  }

  useEffect(() => {
    init();
    paintFromDB();
    animate();
  }, [userDataSelecting, arrayOfPositions, fakePlayer]);

  // useFrame(() => {
  //   switch (fakePlayer) {
  //     case "player1":
  //       handleController(controller);
  //       break;
  //     case "player2":
  //       handleController(controller2);
  //       break;
  //     default:
  //       break;
  //   }
  //   gl.render(scene, camera);
  // });
  function animate() {
    gl.setAnimationLoop(render);
  }

  function render() {
    switch (fakePlayer) {
      case "player1":
        handleController(controller);
        break;
      case "player2":
        handleController(controller2);
        break;
      default:
        break;
    }
    gl.render(scene, camera);
  }
  return <></>;
};

export default Painter1;
