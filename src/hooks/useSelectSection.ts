import { create } from "zustand";

interface SelectSectionStore {
  activeSection: string;
  lastTime: number;
  setActiveSection: (activeSection: string) => void;
  setTimeOfLastClick: (lastTime: number) => void;
}

const useSelectSection = create<SelectSectionStore>((set) => ({
  activeSection: "Home",
  lastTime: 0,
  setActiveSection: (activeSection) => set({ activeSection }),
  setTimeOfLastClick: (lastTime) => set({ lastTime }),
}));

export default useSelectSection;
