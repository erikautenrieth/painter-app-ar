import { useFrame, useThree } from "@react-three/fiber";
import { database } from "config/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IColor } from "shared-components/interfaces/host.interface";
import { IPainter } from "shared-components/interfaces/painter.interface";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";

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
  let controller: any;
  let painter: any, painterPlayer1: any;
  const cursor = new THREE.Vector3();
  const [userDataSelecting, setUserDataSelecting] = useState<boolean>(false);
  const [arrayOfPositionPlayer2] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1, setArrayOfPositionPlayer1] = useState<
    IPainter[]
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

    painterPlayer1 = new TubePainter();
    painterPlayer1.setSize(sizePlayer1);
    painterPlayer1.mesh.material.side = THREE.DoubleSide;
    painterPlayer1.mesh.material = new THREE.MeshBasicMaterial({
      color: colorPlayer1?.hex.slice(0, 7),
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

    if (gl) {
      if (gl.xr) {
        if (gl.xr.getController(0)) {
          controller = gl.xr.getController(0);
          controller.addEventListener("selectstart", onSelectStart);
          controller.addEventListener("selectend", onSelectEnd);
          controller.userData.skipFrames = 0;
          controller.userData.painter = painter;
          scene.add(controller);
        }
      }
    }

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

          const object: IPainter = {
            x: cursor.x,
            y: cursor.y,
            z: cursor.z,
            type: "move",
          };
          arrayOfPositionPlayer2.push(object);
        } else {
          painter.lineTo(cursor);
          painter.update();

          const object: IPainter = {
            x: cursor.x,
            y: cursor.y,
            z: cursor.z,
            type: "line",
          };
          arrayOfPositionPlayer2.push(object);
        }
      }
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

  function paintFromDB(positionObj: any) {
    const painterToUse = painterPlayer1;
    const position = positionObj;

    cursor.set(position.x, position.y, position.z);
    if (position.type === "move") {
      painterToUse.moveTo(cursor);
    }

    if (position.type === "line") {
      painterToUse.lineTo(cursor);
      painterToUse.update();
    }
  }
  const setCursorToLastPosition = (x: number, y: number, z: number) => {
    cursor.set(x, y, z);
    painterPlayer1.moveTo(cursor);
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
        if (arrayOfPositionPlayer1.length !== 0) {
          if (indexOfArrayPositionsT < arrayOfPositionPlayer1.length) {
            setCursorToLastPosition(
              arrayOfPositionPlayer1[indexOfArrayPositionsT + 1].x,
              arrayOfPositionPlayer1[indexOfArrayPositionsT + 1].y,
              arrayOfPositionPlayer1[indexOfArrayPositionsT + 1].z
            );
            for (
              let index = indexOfArrayPositionsT + 2;
              index < arrayOfPositionPlayer1.length;
              index++
            ) {
              paintFromDB(arrayOfPositionPlayer1[index]);
            }
            setIndexOfArrayPositions(arrayOfPositionPlayer1.length);
          }
        }
      }
    }
  }, [arrayOfPositionPlayer1]);

  useFrame(() => {
    if (controller) {
      handleController(controller);
      gl.render(scene, camera);
    }
  });

  return <></>;
};

export default Painter2;
