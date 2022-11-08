export const directionOffset = ({ forward, backward, left, right }: any) => {
  let directionOffset = 0; //w
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4; //w+a
    } else if (right) {
      directionOffset = -Math.PI / 4; //w+d
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; //s+a
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; //s+d
    } else {
      directionOffset = Math.PI; //s
    }
  } else if (left) {
    directionOffset = Math.PI / 2; //a
  } else if (right) {
    directionOffset = -Math.PI / 2; //d
  }

  return directionOffset;
};
