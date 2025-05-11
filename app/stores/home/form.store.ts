import { create } from 'zustand'
export type formAction = 'create' | 'update' | 'none'

interface CreateUpdateFormStates {
  gemId: string
  formAction: formAction
  setGemId: (gemId: string) => void
  setFormAction: (formAction: formAction) => void
  resetFormState: () => void
}

export const useCreateUpdateForm = create<CreateUpdateFormStates>()((set) => ({
  gemId: '',
  formAction: 'none',
  setGemId: (gemId: string) => set({ gemId: gemId }),
  setFormAction: (action: formAction) => set({ formAction: action }),
  resetFormState: () => set({ gemId: '', formAction: 'none' }),
}))
