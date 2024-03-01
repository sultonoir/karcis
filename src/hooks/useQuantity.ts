import { create } from "zustand";

interface QuantityStore {
  count: number;
  increment: (value: number) => void;
  decrement: (value: number) => void;
}

const useQuantity = create<QuantityStore>((set) => ({
  count: 0,
  increment: (value) => set({ count: value++ }),
  decrement: (value) => set({ count: value-- }),
}));

export default useQuantity;
