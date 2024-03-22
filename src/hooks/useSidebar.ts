import { create } from "zustand";

interface SidebarState {
  value: string;
  onValueChange: (value: string) => void;
}

const useSidebar = create<SidebarState>((set) => ({
  value: "",
  onValueChange: (value) => set({ value }),
}));

export default useSidebar;
