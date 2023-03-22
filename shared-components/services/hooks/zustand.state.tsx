import create from "zustand";
type IZustand = {
  hostingId: string | undefined;
  setHostingId: (id: string | undefined) => void;
};
export const ZustandStore = create<IZustand>((set) => ({
  hostingId: undefined,
  setHostingId: (id: string | undefined) => set(() => ({ hostingId: id })),
}));
