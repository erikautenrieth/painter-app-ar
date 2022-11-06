import { useEffect, useState } from "react";

export const useInput = () => {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  });

  const keys = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    ShiftLeft: "shift",
    Space: "jump",
  };

  const findKey = (key: string) => {
    let keyBack = "";
    switch (key) {
      case "KeyW":
        keyBack = keys.KeyW;
        break;
      case "KeyS":
        keyBack = keys.KeyS;
        break;
      case "KeyA":
        keyBack = keys.KeyA;
        break;
      case "KeyD":
        keyBack = keys.KeyD;
        break;
      case "ShiftLeft":
        keyBack = keys.ShiftLeft;
        break;
      case "Space":
        keyBack = keys.Space;
        break;
      default:
        break;
    }
    return keyBack;
  };

  useEffect(() => {
    const handleKeyDown = (e: { code: any }) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: true }));
    };
    const handleKeyUp = (e: { code: any }) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: false }));
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return input;
};
