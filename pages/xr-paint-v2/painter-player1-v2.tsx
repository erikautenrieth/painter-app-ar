import { useFrame } from "@react-three/fiber";
import { database } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IColor } from "shared-components/interfaces/host.interface";
import { IPainter } from "shared-components/interfaces/painter.interface";
import { updateHostingDoc } from "shared-components/services/data-base/data-base.service";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
import { ARButton } from "three/examples/jsm/webxr/ARButton";

type Props = {
  hostingId: string | undefined;
  color: IColor;
  colorPlayer2: IColor;
  size: number;
  sizePlayer2: number;
};
const PainterPlayer1V2: React.FC<Props> = ({
  hostingId,
  color,
  colorPlayer2,
  size,
  sizePlayer2,
}) => {
  let container;
  let camera: THREE.PerspectiveCamera,
    scene: any,
    renderer: THREE.WebGLRenderer;
  let controller: THREE.Object3D<THREE.Event> | THREE.XRTargetRaySpace,
    painter: any,
    painterPlayer2: any;

  const cursor = new THREE.Vector3();

  const [userDataSelecting, setUserDataSelecting] = useState<boolean>(false);

  // ### 2
  const [arrayOfPositionPlayer1Prefix, setArrayOfPositionPlayer1Prefix] =
    useState<number>(0);
  let arrayOfPositionPlayer1PrefixDynamic = 0;
  const [arrayOfPositionPlayer1PreIndex, setArrayOfPositionPlayer1PreIndex] =
    useState<number>(0);
  let arrayOfPositionPlayer1PreIndexDynamic = 0;
  const [
    arrayOfPositionPlayer1CurrentIndex,
    setArrayOfPositionPlayer1CurrentIndex,
  ] = useState<number>(150);
  const arrayOfPositionPlayer1StepIndex: number = 150;

  const [arrayOfPositionPlayer1] = useState<IPainter[]>([]);
  let arrayOfPositionyPlayer1Dynamic: any = {
    player1Position_0: [],
  };
  const [arrayOfPositionPlayer2, setArrayOfPositionPlayer2] = useState<
    IPainter[]
  >([]);

  const [allDataFromDB, setAllDataFromDB] = useState<any>();
  const [readingDataFromDB, setReadingDataFromDB] = useState<boolean>(false);

  const [indexOfArrayPositionsT, setIndexOfArrayPositions] =
    useState<number>(0);

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
    if (light) {
      scene.add(light);
    }

    //

    painter = new TubePainter();
    painter.setSize(size);
    painter.mesh.material.side = THREE.DoubleSide;
    painter.mesh.material = new THREE.MeshBasicMaterial({
      color: color.hex.slice(0, 7),
    });
    if (painter) {
      scene.add(painter.mesh);
    }

    painterPlayer2 = new TubePainter();
    painterPlayer2.setSize(sizePlayer2);
    painterPlayer2.mesh.material.side = THREE.DoubleSide;
    painterPlayer2.mesh.material = new THREE.MeshBasicMaterial({
      color: colorPlayer2?.hex.slice(0, 7),
    });
    if (painterPlayer2) {
      scene.add(painterPlayer2.mesh);
    }
    //

    function onSelectStart(this: any) {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
      setUserDataSelecting(true);
    }

    function onSelectEnd(this: any) {
      this.userData.isSelecting = false;
      setUserDataSelecting(false);
      setTimeout(() => {
        console.log(
          "Hamedkabir index   ",
          arrayOfPositionPlayer1PreIndex,
          "    ",
          arrayOfPositionPlayer1Prefix
        );

        console.log("hamedkabir   ", arrayOfPositionyPlayer1Dynamic);

        // bad case
        // updatePlayerPosition2(arrayOfPositionPlayer1);
        // ### 2
        // arrayOfPositionPlayer1Handler2();
      }, 100);
    }

    controller = renderer.xr.getController(0);
    controller.addEventListener("selectstart", onSelectStart);
    controller.addEventListener("selectend", onSelectEnd);
    controller.userData.skipFrames = 0;
    if (controller) {
      scene.add(controller);
    }

    //

    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  // --------------------------------------------------
  // Player 2
  const initPlayer2 = () => {
    painterPlayer2 = new TubePainter();
    painterPlayer2.setSize(sizePlayer2);
    painterPlayer2.mesh.material.side = THREE.DoubleSide;
    painterPlayer2.mesh.material = new THREE.MeshBasicMaterial({
      color: colorPlayer2?.hex.slice(0, 7),
    });
    scene.add(painterPlayer2.mesh);
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

  const getPlayerPosition = async () => {
    const docKey = hostingId;
    onSnapshot(doc(database, `host/${docKey}`), (doc) => {
      const data = doc.data();
      const id = doc.id;
      if (data) {
        // for Painter2
        let index = 0;
        let bool = false;
        let arrayObjectFromDB: IPainter[] = [];
        while (!bool) {
          const prefixName = `player2Position_${index}`;

          if (data[prefixName]) {
            setReadingDataFromDB(true);
            arrayObjectFromDB.push(...data[prefixName]);
            index++;
          } else {
            bool = true;
          }
        }

        const filterArray: IPainter[] = arrayOfPositionPlayer2;
        const lengthOfFilterArray: number = filterArray.length;
        if (lengthOfFilterArray < arrayObjectFromDB.length) {
          filterArray.push(
            ...arrayObjectFromDB.slice(
              lengthOfFilterArray,
              arrayObjectFromDB.length
            )
          );
          setArrayOfPositionPlayer2(filterArray);
        }

        setAllDataFromDB(data);
        setReadingDataFromDB(false);
      }
    });
  };
  // --------------------------------------------------

  //

  function handleController(controller: any) {
    const userData = controller.userData;

    cursor.set(0, 0, -0.2).applyMatrix4(controller.matrixWorld);

    if (userData.isSelecting === true) {
      if (userData.skipFrames >= 0) {
        // TODO(mrdoob) Revisit this

        userData.skipFrames--;

        painter.moveTo(cursor);
        const object: IPainter = {
          x: cursor.x,
          y: cursor.y,
          z: cursor.z,
          type: "move",
          color: color,
          size: size,
        };
        // ### 1
        addObjectToArrayPoisitionPlayer1(object);
        // ### 2
        // arrayOfPositionPlayer1.push(object);
      } else {
        painter.lineTo(cursor);
        painter.update();
        const object: IPainter = {
          x: cursor.x,
          y: cursor.y,
          z: cursor.z,
          type: "line",
          color: color,
          size: size,
        };
        // ### 1
        addObjectToArrayPoisitionPlayer1(object);
        // ### 2
        // arrayOfPositionPlayer1.push(object);
      }
    }
  }

  const addObjectToArrayPoisitionPlayer1 = (obj: IPainter) => {
    if (arrayOfPositionPlayer1PreIndexDynamic < 150) {
      // setArrayOfPositionPlayer1PreIndex((res) => (res = res + 1));
      arrayOfPositionPlayer1PreIndexDynamic++;
    } else {
      // setArrayOfPositionPlayer1PreIndex(0);
      // setArrayOfPositionPlayer1Prefix((res) => (res = res + 1));
      arrayOfPositionPlayer1PreIndexDynamic = 0;
      arrayOfPositionPlayer1PrefixDynamic++;
    }
    console.log(arrayOfPositionPlayer1PreIndexDynamic);

    arrayOfPositionyPlayer1Dynamic[
      `player1Position_${arrayOfPositionPlayer1PrefixDynamic}`
    ].push(obj);
  };

  // ### 2
  const arrayOfPositionPlayer1Handler2 = () => {
    let array: IPainter[] = [];
    console.log(
      "Hamedkabir  ",
      arrayOfPositionPlayer1,
      "  ",
      arrayOfPositionPlayer1PreIndex
    );

    if (
      arrayOfPositionPlayer1.length >= arrayOfPositionPlayer1PreIndex &&
      arrayOfPositionPlayer1.length < arrayOfPositionPlayer1CurrentIndex
    ) {
    } else {
      const pre =
        arrayOfPositionPlayer1PreIndex + arrayOfPositionPlayer1StepIndex;

      setArrayOfPositionPlayer1PreIndex(pre);
      const curr =
        arrayOfPositionPlayer1CurrentIndex + arrayOfPositionPlayer1StepIndex;
      setArrayOfPositionPlayer1CurrentIndex(curr);

      const prefix = arrayOfPositionPlayer1Prefix + 1;
      setArrayOfPositionPlayer1Prefix(prefix);
    }
    array = arrayOfPositionPlayer1.slice(
      arrayOfPositionPlayer1PreIndex,
      arrayOfPositionPlayer1CurrentIndex
    );
    updatePlayerPosition2(array);
  };

  // ### 2
  const updatePlayerPosition2 = async (painterToUpdate: IPainter[]) => {
    const keyName = `player1Position_${arrayOfPositionPlayer1Prefix}`;
    await updateHostingDoc(hostingId, painterToUpdate, keyName);
  };

  useEffect(() => {
    init();
    animate();
  }, []);

  useEffect(() => {
    getPlayerPosition();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (scene) {
        initPlayer2();
      }
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
    }, 100);
  }, [arrayOfPositionPlayer2, readingDataFromDB, allDataFromDB]);

  function animate() {
    renderer.setAnimationLoop(render);
  }

  function render() {
    if (controller) {
      handleController(controller);

      renderer.render(scene, camera);
    }
  }
  return <></>;
};
export default PainterPlayer1V2;
