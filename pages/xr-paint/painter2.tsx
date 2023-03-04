import { useFrame, useThree } from "@react-three/fiber";
import { database } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IColor } from "shared-components/interfaces/host.interface";
import { IPainter } from "shared-components/interfaces/painter.interface";
import { updateHostingDoc } from "shared-components/services/data-base/data-base.service";
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
  // ### 1
  const [testingHamedkabir] = useState<any[]>([
    {
      player2Position_0: [],
    },
  ]);
  // ### 2
  const [arrayOfPositionPlayer2Prefix, setArrayOfPositionPlayer2Prefix] =
    useState<number>(0);
  const [arrayOfPositionPlayer2PreIndex, setArrayOfPositionPlayer2PreIndex] =
    useState<number>(0);
  const [
    arrayOfPositionPlayer2CurrentIndex,
    setArrayOfPositionPlayer2CurrentIndex,
  ] = useState<number>(150);
  const arrayOfPositionPlayer2StepIndex: number = 150;

  const [arrayOfPositionPlayer2] = useState<IPainter[]>([]);
  const [arrayOfPositionPlayer1, setArrayOfPositionPlayer1] = useState<
    IPainter[]
  >([]);

  const [allDataFromDB, setAllDataFromDB] = useState<any>();
  const [readingDataFromDB, setReadingDataFromDB] = useState<boolean>(false);

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
      setTimeout(() => {
        // ### 1
        // updatePlayerPosition();
        // ### 2
        arrayOfPositionPlayer2Handler2();
      }, 200);
    }

    setTimeout(() => {
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
    }, 200);

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
          // ### 1
          // arrayOfPositionPlayer2Handler(object);
          // ### 2
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
          // ### 1
          // arrayOfPositionPlayer2Handler(object);
          // ### 2
          arrayOfPositionPlayer2.push(object);
        }
      }
    }
  };

  // ### 1
  const arrayOfPositionPlayer2Handler = async (obj: IPainter) => {
    // arrayOfPositionPlayer1.push(obj);
    const keyName = `player2Position_${arrayOfPositionPlayer2Prefix}`;
    if (testingHamedkabir[arrayOfPositionPlayer2Prefix][keyName]) {
      if (
        testingHamedkabir[arrayOfPositionPlayer2Prefix][keyName].length >=
          arrayOfPositionPlayer2PreIndex &&
        testingHamedkabir[arrayOfPositionPlayer2Prefix][keyName].length <
          arrayOfPositionPlayer2CurrentIndex
      ) {
        testingHamedkabir[arrayOfPositionPlayer2Prefix][keyName].push(obj);
      } else {
        const prefix = arrayOfPositionPlayer2Prefix + 1;
        setArrayOfPositionPlayer2Prefix(prefix);
        const newKeyName = `player2Position_${prefix}`;
        const testingObject: any = {
          [newKeyName]: [],
        };
        testingObject[newKeyName].push(obj);
        testingHamedkabir.push(testingObject);
      }
    }
  };

  // ### 2
  const arrayOfPositionPlayer2Handler2 = () => {
    let array: IPainter[] = [];
    if (
      arrayOfPositionPlayer2.length >= arrayOfPositionPlayer2PreIndex &&
      arrayOfPositionPlayer2.length < arrayOfPositionPlayer2CurrentIndex
    ) {
    } else {
      const pre =
        arrayOfPositionPlayer2PreIndex + arrayOfPositionPlayer2StepIndex;

      setArrayOfPositionPlayer2PreIndex(pre);
      const curr =
        arrayOfPositionPlayer2CurrentIndex + arrayOfPositionPlayer2StepIndex;
      setArrayOfPositionPlayer2CurrentIndex(curr);

      const prefix = arrayOfPositionPlayer2Prefix + 1;
      setArrayOfPositionPlayer2Prefix(prefix);
    }
    array = arrayOfPositionPlayer2.slice(
      arrayOfPositionPlayer2PreIndex,
      arrayOfPositionPlayer2CurrentIndex
    );
    updatePlayerPosition2(array);
  };

  // ### 1
  const updatePlayerPosition = async () => {
    const keyName = `player2Position_${arrayOfPositionPlayer2Prefix}`;
    await updateHostingDoc(
      hostingId,
      testingHamedkabir[arrayOfPositionPlayer2Prefix][keyName],
      keyName
    );
  };

  // ### 2
  const updatePlayerPosition2 = async (painterToUpdate: IPainter[]) => {
    const keyName = `player2Position_${arrayOfPositionPlayer2Prefix}`;
    await updateHostingDoc(hostingId, painterToUpdate, keyName);
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
        // for Painter1
        let index = 0;
        let bool = false;
        let arrayObjectFromDB: IPainter[] = [];
        while (!bool) {
          const prefixName = `player1Position_${index}`;

          if (data[prefixName]) {
            setReadingDataFromDB(true);
            arrayObjectFromDB.push(...data[prefixName]);
            index++;
          } else {
            bool = true;
          }
        }

        const filterArray: IPainter[] = arrayOfPositionPlayer1;
        const lengthOfFilterArray: number = filterArray.length;
        if (lengthOfFilterArray < arrayObjectFromDB.length) {
          filterArray.push(
            ...arrayObjectFromDB.slice(
              lengthOfFilterArray,
              arrayObjectFromDB.length
            )
          );
          setArrayOfPositionPlayer1(filterArray);
        }

        setAllDataFromDB(data);
        setReadingDataFromDB(false);
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
    // ### with State
    setTimeout(() => {
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
    }, 200);
  }, [arrayOfPositionPlayer1, readingDataFromDB, allDataFromDB]);

  useFrame(() => {
    if (controller) {
      handleController(controller);

      if (gl) {
        gl.render(scene, camera);
      }
    }
  });

  return <></>;
};

export default Painter2;
