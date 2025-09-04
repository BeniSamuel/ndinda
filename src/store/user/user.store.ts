import { create } from "zustand";

interface UserState {
  user: { name: string; email: string } | null;
  setUser: (user: UserState["user"]) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    user;
  },
  logout: () => {
    user: null;
  },
}));
