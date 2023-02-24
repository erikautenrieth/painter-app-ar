import { useFrame, useThree } from "@react-three/fiber";
import { database } from "config/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { IColor } from "pages/hosting-page/[hostingId]";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
import Painter1 from "./painter1";
// That is the position of Paint of Player 1
type Props = {
  hostingId: string | undefined;
  color: IColor;
  colorPlayer1: IColor;
  size: number;
  sizePlayer1: number;
};
const Painter2: React.FC<Props> = ({
  hostingId,
  color,
  colorPlayer1,
  size,
  sizePlayer1,
}: Props) => {
  const { gl, scene } = useThree();
  let camera: THREE.PerspectiveCamera;
  let controller: any, controllerPlayer1: any;
  let painter: any, painterPlayer1: any;
  const cursor = new THREE.Vector3();
  const [userDataSelecting, setUserDataSelecting] = useState<boolean>(false);
  const [arrayOfPositionPlayer2] = useState<
    {
      x: number;
      y: number;
      z: number;
      type: string;
      color: IColor;
      size: number;
    }[]
  >([]);
  const [arrayOfPositionPlayer1, setArrayOfPositionPlayer1] = useState<
    {
      x: number;
      y: number;
      z: number;
      type: "move" | "line";
      color: IColor;
      size: number;
    }[]
  >([]);

  let indexOfArrayPositions: number = 0;

  const init = (paintColorPlayer1?: IColor, paintSizePlayer1?: number) => {
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
    painter.setSize(size);
    painter.mesh.material.side = THREE.DoubleSide;
    painter.mesh.material = new THREE.MeshBasicMaterial({
      color: color.hex.slice(0, 7),
    });
    scene.add(painter.mesh);

    painterPlayer1 = new TubePainter();
    painterPlayer1.setSize(sizePlayer1);
    painterPlayer1.mesh.material.side = THREE.DoubleSide;
    painterPlayer1.mesh.material = new THREE.MeshBasicMaterial({
      color: colorPlayer1.hex.slice(0, 7),
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
    controller.userData.painter1 = painterPlayer1;
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
      const painter1 = userData.painter1;
      cursor.set(0, 0, -0.2).applyMatrix4(ctl.matrixWorld);

      if (userDataSelecting === true) {
        if (userData.skipFrames >= -2) {
          userData.skipFrames--;
          painter.moveTo(cursor);

          const object = {
            x: cursor.x,
            y: cursor.y,
            z: cursor.z,
            type: "move",
            color: color,
            size: size,
          };
          arrayOfPositionPlayer2.push(object);
        } else {
          painter.lineTo(cursor);
          painter.update();

          const object = {
            x: cursor.x,
            y: cursor.y,
            z: cursor.z,
            type: "line",
            color: color,
            size: size,
          };
          arrayOfPositionPlayer2.push(object);
        }
      }

      // if (indexOfArrayPositions < arrayOfPositionPlayer2.length) {
      //   cursor.set(
      //     arrayOfPositionPlayer2[indexOfArrayPositions].x,
      //     arrayOfPositionPlayer2[indexOfArrayPositions].y,
      //     arrayOfPositionPlayer2[indexOfArrayPositions].z
      //   );
      //   if (arrayOfPositionPlayer2[indexOfArrayPositions].type == "move") {
      //     painter1.moveTo(cursor);
      //   } else {
      //     painter1.lineTo(cursor);
      //     painter1.update();
      //   }
      //   indexOfArrayPositions++;
      // }
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

  function paintFromDB(painterObj: any) {
    if (indexOfArrayPositions < arrayOfPositionPlayer1.length) {
      const userData = painterObj.userData;
      const painter = userData.painter1;
      cursor.set(
        arrayOfPositionPlayer1[indexOfArrayPositions].x,
        arrayOfPositionPlayer1[indexOfArrayPositions].y,
        arrayOfPositionPlayer1[indexOfArrayPositions].z
      );
      if (arrayOfPositionPlayer1[indexOfArrayPositions].type == "move") {
        painter.moveTo(cursor);
      } else {
        painter.lineTo(cursor);
        painter.update();
      }
      indexOfArrayPositions++;
      paintFromDB(painterObj);
    } else {
      cursor.set(0, 0, -0.2);
      painter.moveTo(cursor);
    }
  }

  /**
   * this method read player position from document and array
   */
  const getPlayerPosition = async () => {
    const docKey = hostingId;
    onSnapshot(doc(database, `host/${docKey}`), (doc) => {
      const data = doc.data();
      const id = doc.id;
      if (data) {
        setArrayOfPositionPlayer1(data.player1Position);
      }
    });
  };

  useEffect(() => {
    init();
  }, [userDataSelecting]);

  useEffect(() => {
    getPlayerPosition();
  }, []);

  useEffect(() => {
    init();
    if (painterPlayer1) {
      if (arrayOfPositionPlayer1) {
        if (controller) {
          console.log("hamedkabir");

          paintFromDB(controller);
        }
      }
    }
  }, [arrayOfPositionPlayer1, painterPlayer1]);

  useFrame(() => {
    if (controller) {
      handleController(controller);
      gl.render(scene, camera);
    }
  });

  return <></>;
};

export default Painter2;
