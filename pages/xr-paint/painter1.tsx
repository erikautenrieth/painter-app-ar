import { useFrame, useThree } from "@react-three/fiber";
import { database } from "config/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { IColor } from "pages/hosting-page/[hostingId]";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
// That is the position of Paint of Player 2
type Props = {
  hostingId: string | undefined;
  color: IColor;
  colorPlayer2: IColor;
  size: number;
  sizePlayer2: number;
};
const Painter1: React.FC<Props> = ({
  hostingId,
  color,
  colorPlayer2,
  size,
  sizePlayer2,
}: Props) => {
  const { gl, scene } = useThree();
  let camera: THREE.PerspectiveCamera;
  let controller: any;
  let painter: any, painterPlayer2: any;
  const cursor = new THREE.Vector3();
  const [userDataSelecting, setUserDataSelecting] = useState<boolean>(false);
  const [arrayOfPositionPlayer1] = useState<
    {
      x: number;
      y: number;
      z: number;
      type: string;
      color: IColor;
      size: number;
    }[]
  >([]);
  const [arrayOfPositionPlayer2, setArrayOfPositionPlayer2] = useState<
    {
      x: number;
      y: number;
      z: number;
      type: "move" | "line";
      color: IColor;
      size: number;
    }[]
  >([]);

  const [indexOfArrayPositionsT, setIndexOfArrayPositions] =
    useState<number>(0);
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
    painter.setSize(size);
    painter.mesh.material.side = THREE.DoubleSide;
    painter.mesh.material = new THREE.MeshBasicMaterial({
      color: color.hex.slice(0, 7),
    });
    scene.add(painter.mesh);

    painterPlayer2 = new TubePainter();
    painterPlayer2.setSize(sizePlayer2);
    painterPlayer2.mesh.material.side = THREE.DoubleSide;
    painterPlayer2.mesh.material = new THREE.MeshBasicMaterial({
      color: colorPlayer2?.hex.slice(0, 7),
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
      updatePlayerPosition();
    }
    controller = gl.xr.getController(0);
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    controller.userData.skipFrames = 0;
    controller.userData.painter = painter;
    controller.userData.painter2 = painterPlayer2;
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
      const painter2 = userData.painter2;

      cursor.set(0, 0, -0.2).applyMatrix4(ctl.matrixWorld);
      if (userDataSelecting) {
      }
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
          arrayOfPositionPlayer1.push(object);
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
          arrayOfPositionPlayer1.push(object);
        }
      }
    }
  };

  const updatePlayerPosition = async () => {
    if (arrayOfPositionPlayer1.length > 0) {
      const docKey = hostingId;
      const docRef = doc(database, `host/${docKey}`);
      await updateDoc(docRef, {
        player1Position: arrayOfPositionPlayer1,
      });
    }
  };

  const paintFromDB = (positionObj: any) => {
    console.log("Hamedkabir painter Object", positionObj);
    const painterToUse = painterPlayer2;
    const position = positionObj;

    cursor.set(position.x, position.y, position.z);
    if (position.type === "move") {
      painterToUse.moveTo(cursor);
    } else {
      painterToUse.lineTo(cursor);
      painterToUse.update();
    }
  };

  const paintFromDBReset = () => {
    cursor.set(0, 0, -0.2);
    painterPlayer2.moveTo(cursor);
  };

  const resetPainterPlayer2Array = () => {
    setArrayOfPositionPlayer2([]);
    setIndexOfArrayPositions(0);
  };

  /**
   * this method read player position from document and array
   */
  const getPlayerPosition = async () => {
    const docKey = hostingId;
    onSnapshot(doc(database, `host/${docKey}`), (doc) => {
      const data = doc.data();
      const id = doc.id;
      if (data) {
        setArrayOfPositionPlayer2(data.player2Position);
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
    if (painterPlayer2) {
      if (arrayOfPositionPlayer2) {
        for (
          let index = indexOfArrayPositionsT + 1;
          index < arrayOfPositionPlayer2.length - 1;
          index++
        ) {
          paintFromDB(arrayOfPositionPlayer2[index]);
          setIndexOfArrayPositions((prev) => prev + 1);
        }
      }
    }
  }, [arrayOfPositionPlayer2, painterPlayer2]);
  useFrame(() => {
    if (controller) {
      handleController(controller);
      gl.render(scene, camera);
    }
  });
  return <></>;
};

export default Painter1;
