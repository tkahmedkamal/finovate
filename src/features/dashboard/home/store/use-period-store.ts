import { create } from 'zustand';

interface State {
  period: Period;
  setPeriod: (_period: Period) => void;
}

const usePeriodStore = create<State>(set => ({
  period: {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  },
  setPeriod: period => set({ period })
}));

export default usePeriodStore;
