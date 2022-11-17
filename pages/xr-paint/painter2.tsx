import { useFrame, useThree } from "@react-three/fiber";
import { database } from "config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
import Painter1 from "./painter1";
// That is the position of Paint of Player 1
type Props = {
  paintPositionFromDB: {
    x: number;
    y: number;
    z: number;
  }[];
  hostingId: string | undefined;
};
const Painter2: React.FC<Props> = ({
  paintPositionFromDB,
  hostingId,
}: Props) => {
  const { gl, scene } = useThree();
  let camera: THREE.PerspectiveCamera;
  let controller: any;
  let painter: any, painterPlayer1: any;
  const cursor = new THREE.Vector3();
  const [userDataSelecting, setUserDataSelecting] = useState<boolean>(false);
  const [arrayOfPositionPlayer2] = useState<any[]>([]);
  const [arrayOfPositionPlayer1, setArrayOfPositionPlayer1] =
    useState<{ x: number; y: number; z: number }[]>(paintPositionFromDB);

  const [loader, setLoader] = useState<boolean>(false);
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
    painter.mesh.material = new THREE.MeshBasicMaterial({ color: 0xf2bb07 });
    scene.add(painter.mesh);

    painterPlayer1 = new TubePainter();
    painterPlayer1.setSize(0.4);
    painterPlayer1.mesh.material.side = THREE.DoubleSide;
    painterPlayer1.mesh.material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });
    scene.add(painterPlayer1.mesh);

    function onSelectStart(this: any) {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
      setUserDataSelecting(true);
    }

    function onSelectEnd(this: any) {
      this.userData.isSelecting = false;
      setUserDataSelecting(false);
      updatePlayerPosition();
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
        if (userData.skipFrames >= -2) {
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
          arrayOfPositionPlayer2.push(object);
        }
      }
    }
  };
  const updatePlayerPosition1 = async () => {
    if (arrayOfPositionPlayer2.length > 0) {
      const docKey = "zb5tWRiOArpG0vR5PjO8";
      const collectionRef = collection(database, `host/${docKey}/player2`);
      arrayOfPositionPlayer2.forEach(async (item) => {
        await addDoc(collectionRef, item);
      });
    }
  };

  const updatePlayerPosition = async () => {
    if (arrayOfPositionPlayer2.length > 0) {
      const docKey = hostingId;
      const docRef = doc(database, `host/${docKey}`);
      await updateDoc(docRef, {
        player2Position: arrayOfPositionPlayer2,
      });
    }
  };

  function paintFromDB() {
    if (indexOfArrayPositions < arrayOfPositionPlayer1.length) {
      const painter = painterPlayer1;
      cursor.set(
        arrayOfPositionPlayer1[indexOfArrayPositions].x,
        arrayOfPositionPlayer1[indexOfArrayPositions].y,
        arrayOfPositionPlayer1[indexOfArrayPositions].z
      );
      if (indexOfArrayPositions < 1) {
        painter.moveTo(cursor);
      } else {
        painter.lineTo(cursor);
        painter.update();
      }
      indexOfArrayPositions++;
      paintFromDB();
    } else {
      cursor.set(0, 0, -0.2);
      painter.moveTo(cursor);
    }
  }

  useEffect(() => {
    init();
  }, [userDataSelecting]);

  useEffect(() => {
    setArrayOfPositionPlayer1(paintPositionFromDB);
    if (painterPlayer1) {
      if (arrayOfPositionPlayer1) {
        paintFromDB();
      }
    }
  }, [paintPositionFromDB]);
  useFrame(() => {
    if (controller) {
      if (indexOfArrayPositions < paintPositionFromDB.length) {
        // paintFromDB();
      }
      handleController(controller);
      gl.render(scene, camera);
    }
  });

  return <></>;
};

export default Painter2;
