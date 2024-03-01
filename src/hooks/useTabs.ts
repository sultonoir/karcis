import { create } from "zustand";

interface TabsState {
  value: string;
  onChange: (value: string) => void;
}

const useTabs = create<TabsState>((set) => ({
  value: "description",
  onChange: (value) => set({ value }),
}));

export default useTabs;
