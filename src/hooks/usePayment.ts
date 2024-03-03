import { create } from "zustand";

export type Cart = {
  name: string;
  totalPrice: number;
  totalProduct: number;
  ticketId: string;
  eventId: string;
};

interface Event {
  eventId: string;
  eventImage: string;
  eventName: string;
  amount: number;
  price: number;
}
interface CartState {
  selected: Cart[];
  eventId: string;
  eventImage: string;
  eventName: string;
  amount: number;
  price: number;
  increment: (value: Cart) => void;
  decrement: (value: Cart) => void;
  addPayment: (value: Event) => void;
}

const usePayment = create<CartState>((set) => ({
  selected: [],
  eventId: "",
  eventImage: "",
  eventName: "",
  amount: 0,
  price: 0,
  addPayment: (values) =>
    set({
      eventId: values.eventId,
      eventImage: values.eventImage,
      eventName: values.eventName,
      amount: values.amount,
      price: values.price,
    }),
  increment: (value) => {
    set((state) => {
      if (state.eventId === value.eventId) {
        const newData = state.selected.map((item) =>
          item.ticketId === value.ticketId
            ? {
                ...item,
                totalProduct: item.totalProduct + 1,
                totalPrice: value.totalPrice * (item.totalProduct + 1),
              }
            : item,
        );

        const productExists = newData.some(
          (item) => item.ticketId === value.ticketId,
        );

        if (!productExists) {
          newData.push(value);
        }

        return { selected: newData, eventId: value.eventId };
      } else {
        return { selected: [value], eventId: value.eventId };
      }
    });
  },
  decrement: (value) => {
    set((state) => {
      const newData = state.selected
        .map((item) =>
          item.ticketId === value.ticketId
            ? {
                ...item,
                totalProduct: item.totalProduct - 1,
                totalPrice: value.totalPrice * (item.totalProduct - 1),
              }
            : item,
        )
        .filter((item) => item.totalProduct > 0);

      return { selected: newData, eventId: state.eventId };
    });
  },
}));

export default usePayment;
