import create from "zustand";

interface UserState {
  user: any;
  setUserData: (data: any) => void;
}

export const userStateService = create<UserState>()((set) => ({
  // initial state
  user: undefined,

  // method to modify state
  setUserData: (data) => set({ user: data }),
}));
