export type IPosition = {
  x: number;
  y: number;
  z: number;
};

export type IColor = {
  hex: string;
  hsv: {
    a?: number | null;
    h: number;
    s: number;
    v: number;
  };
  rgb: {
    a?: number | null;
    b: number;
    g: number;
    r: number;
  };
};
export type IHost = {
  player1Ready: boolean;
  player2Ready: boolean;
  createdAt: Date;
  player1Position: IPosition[];
  player2Position: IPosition[];
  player1Color: IColor;
  player2Color: IColor;
  player1PaintSize: number;
  player2PaintSize: number;
};
