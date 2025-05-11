import { create } from 'zustand'

interface GemLngLatStates {
  gemLngLat: number[]
  locationConfirmed: boolean
  setGemLngLat: (gemLngLat: number[]) => void
  setLocationConfirmed: (c: boolean) => void
  resetGemLngLatState: () => void
}

export const useGemLngLat = create<GemLngLatStates>()((set) => ({
  gemLngLat: [],
  locationConfirmed: false,
  setGemLngLat: (gemLngLat) => set({ gemLngLat: gemLngLat }),
  setLocationConfirmed: (locationConfirmed) => set({ locationConfirmed }),
  resetGemLngLatState: () => set({ gemLngLat: [], locationConfirmed: false }),
}))
