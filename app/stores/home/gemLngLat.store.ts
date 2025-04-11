import { create } from 'zustand'

interface GemLngLat {
  gemLngLat: number[]
  locationConfirmed: boolean
  setGemLngLat: (gemLngLat: number[]) => void
  setLocationConfirmed: (c: boolean) => void
}

export const useGemLngLat = create<GemLngLat>()((set) => ({
  gemLngLat: [],
  locationConfirmed: false,
  setGemLngLat: (gemLngLat) => set({ gemLngLat: gemLngLat }),
  setLocationConfirmed: (locationConfirmed) => set({ locationConfirmed }),
}))
