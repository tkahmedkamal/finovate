import { create } from 'zustand';

interface State {
  open: boolean;
  setOpen: (_open: boolean) => void;
}

const useToggleTransactionModalStore = create<State>(set => ({
  open: false,
  setOpen: open => set({ open })
}));

export default useToggleTransactionModalStore;
