import { createStore } from "zustand";

export const useAppSettingsStore = create((set) => ({
    data : {},
    setAppSettings
}))