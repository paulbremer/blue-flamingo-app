import { create } from "zustand";

interface DataState {
    topTracks: any[];
    currentLimit: number;
    setLimit: (offset: number) => void;
    currentOffset: number;
    setOffset: (offset: number) => void;
    setTopTracks: (topTracks: any[]) => void;
}

export const useSpotifyStore = create<DataState>((set) => ({
    topTracks: [],
    setTopTracks: (topTracks) => set(() => ({ topTracks })),
    currentLimit: 10,
    setLimit: (limit) => set(() => ({ currentLimit: limit })),
    currentOffset: 0,
    setOffset: (offset) => set(() => ({ currentOffset: offset })),
}));
