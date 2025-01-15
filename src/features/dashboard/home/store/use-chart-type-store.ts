import { create } from 'zustand';

interface State {
  type: ChartType;
  setType: (_type: ChartType) => void;
}

const useChartTypeStore = create<State>(set => ({
  type: 'area',
  setType: type => set({ type })
}));

export default useChartTypeStore;
