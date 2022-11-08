import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useInput } from "../../shared-components/services/hooks/useInput";
import { directionOffset } from "../../shared-components/services/player/player.service";

const MyBox = () => {
  const { forward, backward, left, right, jump, shift } = useInput();
  const controlRef = useRef<any>(null);
  const boxRef = useRef<any>(null);
  // const camera = useThree((state) => state.camera);
  useEffect(() => {}, [forward, backward, left, right, jump, shift]);

  useFrame((state, delta) => {
    //diagonal movement angle offset
    let newDirectionOffset = directionOffset({
      forward,
      backward,
      left,
      right,
    });
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
  });

  return (
    <>
      <Box ref={boxRef} />
    </>
  );
};

export default MyBox;
