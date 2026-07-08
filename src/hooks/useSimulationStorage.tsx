import type {
  SimulationFormData,
  SimulationRecord,
} from '@/components/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = { ...formData, id }

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const saveData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...saveData, record]),
    )

    return id
  }

  const getFormData = (id: string) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return null
    }

    const saveData = JSON.parse(storage) as SimulationRecord[]
    return saveData.find((record) => record.id === id) || null
  }

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const saveData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    const updated = saveData.map((record) =>
      record.id === id ? { ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  return { saveFormData, getFormData, updateSimulation }
}
