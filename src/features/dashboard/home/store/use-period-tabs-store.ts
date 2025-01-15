import { create } from 'zustand';

interface State {
  tab: ChartTabs;
  setTab: (_tab: ChartTabs) => void;
}

const usePeriodTabsStore = create<State>(set => ({
  tab: 'year',
  setTab: tab => set({ tab })
}));

export default usePeriodTabsStore;
