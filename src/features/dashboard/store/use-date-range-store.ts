import { startOfMonth } from 'date-fns';
import { create } from 'zustand';

interface State {
  from: Date;
  to: Date;
  setDateRange: (_from: Date, _to: Date) => void;
}

const useDateRangeStore = create<State>(set => ({
  from: startOfMonth(new Date()),
  to: new Date(),
  setDateRange: (_from, _to) => set(() => ({ from: _from, to: _to }))
}));

export default useDateRangeStore;
