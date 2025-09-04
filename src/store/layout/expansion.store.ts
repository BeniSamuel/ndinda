import { create } from "zustand";

interface ExpansionState {
  maximize: boolean | null;
  setMaximize: (maximize: ExpansionState["maximize"]) => void;
  logout: () => void;
}

export const useExpansionStore = create<ExpansionState>((set) => ({
  maximize: false,
  setMaximize: (maximize) => set({ maximize }),
  logout: () => set({ maximize: null }),
}));
