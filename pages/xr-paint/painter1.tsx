import { useFrame, useThree } from "@react-three/fiber";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import { useXR } from "@react-three/xr";
import { database } from "config/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IColor } from "shared-components/interfaces/host.interface";
import { IPainter } from "shared-components/interfaces/painter.interface";
import { updateHostingDoc } from "shared-components/services/data-base/data-base.service";
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
  const [arrayOfPositionPlayer1] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_0] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_1] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_2] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_3] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_4] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_5] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_6] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_7] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_8] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_9] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_10] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_11] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_12] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_13] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_14] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_15] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_16] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_17] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_18] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_19] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_20] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_21] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_22] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_23] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_24] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_25] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_26] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_27] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_28] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_29] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_30] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_31] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_32] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_33] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_34] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_35] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_36] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_37] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_38] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_39] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1_40] = useState<IPainter[]>([]);

  const [arrayOfPositionPlayer2, setArrayOfPositionPlayer2] = useState<
    IPainter[]
  >([]);
  const [arrayOfPositionPlayer2_0] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_1] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_2] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_3] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_4] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_5] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_6] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_7] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_8] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_9] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_10] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_11] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_12] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_13] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_14] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_15] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_16] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_17] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_18] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_19] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_20] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_21] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_22] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_23] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_24] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_25] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_26] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_27] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_28] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_29] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_30] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_31] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_32] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_33] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_34] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_35] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_36] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_37] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_38] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_39] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer2_40] = useState<IPainter[]>([]);

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
          arrayOfPositionPlayer1Handler(object);
        } else {
          painter.lineTo(cursor);
          painter.update();
          const object: IPainter = {
            x: cursor.x,
            y: cursor.y,
            z: cursor.z,
            type: "line",
          };
          arrayOfPositionPlayer1Handler(object);
        }
      }
    }
  };

  const arrayOfPositionPlayer1Handler = async (obj: IPainter) => {
    if (arrayOfPositionPlayer1.length < 150) {
      arrayOfPositionPlayer1.push(obj);
    }
    if (
      arrayOfPositionPlayer1.length >= 150 &&
      arrayOfPositionPlayer1_0.length < 150
    ) {
      arrayOfPositionPlayer1_0.push(obj);
    }
    if (
      arrayOfPositionPlayer1_0.length >= 150 &&
      arrayOfPositionPlayer1_1.length < 150
    ) {
      arrayOfPositionPlayer1_1.push(obj);
    }
  };

  const updatePlayerPosition = async () => {
    if (arrayOfPositionPlayer1.length > 0) {
      if (arrayOfPositionPlayer1.length < 150) {
        await updateHostingDoc(hostingId, arrayOfPositionPlayer1, -1);
      }
      if (
        arrayOfPositionPlayer1.length >= 150 &&
        arrayOfPositionPlayer1_0.length < 150
      ) {
        await updateHostingDoc(hostingId, arrayOfPositionPlayer1_0, 0);
      }
      if (
        arrayOfPositionPlayer1_0.length >= 150 &&
        arrayOfPositionPlayer1_1.length < 150
      ) {
        await updateHostingDoc(hostingId, arrayOfPositionPlayer1_1, 1);
      }
    }
  };

  const paintFromDB = (positionObj: any) => {
    const painterToUse = painterPlayer2;
    const position = positionObj;

    cursor.set(position.x, position.y, position.z);
    if (position.type === "move") {
      painterToUse.moveTo(cursor);
    }

    if (position.type === "line") {
      painterToUse.lineTo(cursor);
      painterToUse.update();
    }
  };
  const setCursorToLastPosition = (x: number, y: number, z: number) => {
    cursor.set(x, y, z);
    painterPlayer2.moveTo(cursor);
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
        if (arrayOfPositionPlayer2.length !== 0) {
          if (indexOfArrayPositionsT < arrayOfPositionPlayer2.length) {
            setCursorToLastPosition(
              arrayOfPositionPlayer2[indexOfArrayPositionsT + 1].x,
              arrayOfPositionPlayer2[indexOfArrayPositionsT + 1].y,
              arrayOfPositionPlayer2[indexOfArrayPositionsT + 1].z
            );
            for (
              let index = indexOfArrayPositionsT + 2;
              index < arrayOfPositionPlayer2.length;
              index++
            ) {
              paintFromDB(arrayOfPositionPlayer2[index]);
            }
            setIndexOfArrayPositions(arrayOfPositionPlayer2.length);
          }
        }
      }
    }
  }, [arrayOfPositionPlayer2]);

  useFrame(() => {
    if (controller) {
      handleController(controller);
      gl.render(scene, camera);
    }
  });

  return <></>;
};

export default Painter1;
