import { IColor } from "./host.interface";

export type IPainter = {
  x: number;
  y: number;
  z: number;
  type: "move" | "line";
  color: IColor;
  size: number;
};
