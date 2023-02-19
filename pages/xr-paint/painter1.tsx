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
import { useEffect, useState } from "react";
import * as THREE from "three";
import { TubePainter } from "three/examples/jsm/misc/TubePainter.js";
// That is the position of Paint of Player 2
type Props = {
  hostingId: string | undefined;
  color: any;
  size: number;
};
const Painter1: React.FC<Props> = ({ hostingId, color, size}: Props) => {
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
      color: any;
      size: number;
    }[]
  >([]);
  const [arrayOfPositionPlayer2, setArrayOfPositionPlayer2] = useState<
    {
      x: number;
      y: number;
      z: number;
      type: "move" | "line";
      color: any;
      size: number;
    }[]
  >([]);

  let indexOfArrayPositions: number = 0;
  // color for user 2 !
  const defaultColorPlayer1: number = 0x00ff00;
  const defaultColorPlayer2: number = 0xf2bb07;
  // size for user 2!
  const defaultPaintSizePlayer1: number = 0.4;
  const defaultPaintSizePlayer2: number = 0.4;


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
      color: color,
    });
    scene.add(painter.mesh);

    painterPlayer2 = new TubePainter();
    painterPlayer2.setSize(defaultPaintSizePlayer2);
    painterPlayer2.mesh.material.side = THREE.DoubleSide;
    painterPlayer2.mesh.material = new THREE.MeshBasicMaterial({
      color:  arrayOfPositionPlayer2 && arrayOfPositionPlayer2.length !== 0  ? arrayOfPositionPlayer2[arrayOfPositionPlayer2.length-1].color: "#dad810",
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

  const paintFromDB = () => {
    if (indexOfArrayPositions < arrayOfPositionPlayer2.length) {
      const painter = painterPlayer2;
      cursor.set(
        arrayOfPositionPlayer2[indexOfArrayPositions].x,
        arrayOfPositionPlayer2[indexOfArrayPositions].y,
        arrayOfPositionPlayer2[indexOfArrayPositions].z
      );
      if (arrayOfPositionPlayer2[indexOfArrayPositions].type == "move") {
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
        console.log("hamedkabir data  ", arrayOfPositionPlayer2);

        paintFromDB();
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
