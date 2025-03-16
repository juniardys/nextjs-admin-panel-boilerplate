import { getStorageAccessToken, getStorageUser, removeStorageAccessToken, removeStorageUser, setStorageAccessToken, setStorageUser } from "@/storage/user.storage";
import { create } from "zustand";

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
};

interface UserState {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  removeUser: () => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  removeAccessToken: () => void;
  processLogout: boolean;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: getStorageUser(),
  setUser: (user) => {
    if (!user) {
      removeStorageUser();
    } else {
      setStorageUser(user);
      set({ user });
    }
  },
  removeUser: () => {
    removeStorageUser();
  },
  accessToken: getStorageAccessToken(),
  setAccessToken: (token) => {
    if (!token) {
      removeStorageAccessToken();
    } else {
      setStorageAccessToken(token);
      set({ accessToken: token });
    }
  },
  removeAccessToken: () => {
    removeStorageAccessToken();
  },
  processLogout: false,
  logout: () => {
    set({ user: null, accessToken: null, processLogout: true });
    set({ processLogout: false });
  },
}));