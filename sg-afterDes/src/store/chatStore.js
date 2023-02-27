import create from "zustand";

export const chatStore = create((set) => ({
  isChatFirstLoad: false,
  setIsChatFirstLoad: (res) => set(() => ({ isChatFirstLoad: res })),
}));
