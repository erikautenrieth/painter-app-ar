import { useFrame, useThree } from "@react-three/fiber";
import { database } from "config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
// That is the position of Paint of Player 2
type Props = {
  paintPositionFromDB: { x: number; y: number; z: number }[];
};
const Painter1: React.FC<Props> = ({ paintPositionFromDB }: Props) => {
  const { gl, scene } = useThree();
  let camera: THREE.PerspectiveCamera;
  let controller: any;
  let painter: any, painterPlayer2: any;
  const cursor = new THREE.Vector3();
  const cursor2 = new THREE.Vector3();
  const [userDataSelecting, setUserDataSelecting] = useState<boolean>(false);
  const [arrayOfPositions, setArrayOfPositions] =
    useState<{ x: number; y: number; z: number }[]>(paintPositionFromDB);
  let indexOfArrayPositions: number = 0;
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

    painterPlayer2 = new TubePainter();
    painterPlayer2.setSize(0.4);
    painterPlayer2.mesh.material.side = THREE.DoubleSide;
    painterPlayer2.mesh.material = new THREE.MeshBasicMaterial({
      color: 0xf2bb07,
    });
    scene.add(painterPlayer2.mesh);

    function onSelectStart(this: any) {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
      setUserDataSelecting(true);
    }

    function onSelectEnd(this: any) {
      this.userData.isSelecting = false;
      setUserDataSelecting(false);
      // updatePlayerPosition();
    }
    controller = gl.xr.getController(0);
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    controller.userData.skipFrames = 0;
    controller.userData.painter = painter;
    scene.add(controller);

    window.addEventListener("resize", onWindowResize);

    setArrayOfPositions(paintPositionFromDB);
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
        if (userData.skipFrames >= -2) {
          // TODO(mrdoob) Revisit thi

          userData.skipFrames--;

          painter.moveTo(cursor);
        } else {
          painter.lineTo(cursor);
          painter.update();
          const object = {
            x: cursor.x,
            y: cursor.y,
            z: cursor.z,
          };
          const arrayObjectOfPosition = arrayOfPositions;

          arrayObjectOfPosition.push(object);
          setArrayOfPositions(arrayObjectOfPosition);
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

  function paintFromDB() {
    if (indexOfArrayPositions < arrayOfPositions.length) {
      cursor.set(
        arrayOfPositions[indexOfArrayPositions].x,
        arrayOfPositions[indexOfArrayPositions].y,
        arrayOfPositions[indexOfArrayPositions].z
      );
      if (indexOfArrayPositions < 1) {
        painterPlayer2.moveTo(cursor);
      } else {
        painterPlayer2.lineTo(cursor);
        painterPlayer2.update();
      }
      indexOfArrayPositions++;
      paintFromDB();
    } else {
      cursor.set(0, 0, -0.2);
      painterPlayer2.moveTo(cursor);
    }
  }

  useEffect(() => {
    init();
  }, [userDataSelecting]);

  useEffect(() => {
    paintFromDB();
  }, [arrayOfPositions]);

  useFrame(() => {
    if (controller) {
      handleController(controller);
      gl.render(scene, camera);
    }
  });
  return <></>;
};

export default Painter1;
