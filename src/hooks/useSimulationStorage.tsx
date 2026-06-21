import type { SimulationFormData } from '@/components/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const saveData = storage
      ? (JSON.parse(storage) as SimulationFormData[])
      : []

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...saveData, formData]),
    )
  }

  return { saveFormData }
}
