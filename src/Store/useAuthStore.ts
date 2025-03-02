import { create } from "zustand";


interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null, // Recuperar token si existe
  setToken: (token) => {
    localStorage.setItem("token", token); // Guardar en localStorage
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem("token"); // Eliminar del localStorage
    set({ token: null });
  },
}));
