import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { database } from "../../config/firebase";
import { useInput } from "../../shared-components/services/hooks/useInput";
import { directionOffset } from "../../shared-components/services/player/player.service";

type Props = {
  user: any;
  originPosition: number[];
};
const MyBox: React.FC<Props> = ({ user, originPosition }: Props) => {
  const { forward, backward, left, right, jump, shift } = useInput();
  const controlRef = useRef<any>(null);
  const boxRef = useRef<any>(null);
  // const camera = useThree((state) => state.camera);
  const updatePlayerPosition = async () => {
    const docKey = "zb5tWRiOArpG0vR5PjO8";

    const docRef = doc(database, `host/${docKey}`);
    await updateDoc(docRef, {
      player1: {
        position: [
          boxRef.current.position.x,
          boxRef.current.position.y,
          boxRef.current.position.z,
        ],
      },
    });
  };
  useEffect(() => {
    if (forward || backward || left || right) {
      updatePlayerPosition();
    }
  }, [forward, backward, left, right, jump, shift]);

  useFrame((state, delta) => {
    //diagonal movement angle offset
    let newDirectionOffset = directionOffset({
      forward,
      backward,
      left,
      right,
    });
    if (user.role == "admin") {
      if (forward) {
        boxRef.current.position.z += 2 * delta;
        if (right) {
          boxRef.current.position.x += -2 * delta;
        } else if (left) {
          boxRef.current.position.x += 2 * delta;
        }
      } else if (backward) {
        boxRef.current.position.z += -2 * delta;
        if (right) {
          boxRef.current.position.x += -2 * delta;
        } else if (left) {
          boxRef.current.position.x += 2 * delta;
        }
      } else if (left) {
        boxRef.current.position.x += 2 * delta;
      } else if (right) {
        boxRef.current.position.x += -2 * delta;
      }
    }
  });

  return (
    <object3D>
      {/* Player1 */}
      <Box
        ref={boxRef}
        position={[originPosition[0], originPosition[1], originPosition[2]]}
      />
    </object3D>
  );
};

export default MyBox;
