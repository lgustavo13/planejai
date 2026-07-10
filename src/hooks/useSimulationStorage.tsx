import type {
  SimulationFormData,
  SimulationRecord,
} from '@/components/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const createdAt = new Date().toLocaleDateString('pt-BR')
    const record: SimulationRecord = { ...formData, id, createdAt }

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

  const getAllSimulations = () => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return []
    }

    return JSON.parse(storage) as SimulationRecord[]
  }

  const deleteSimulation = (id: string) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const saveData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    const filtered = saveData.filter((record) => record.id !== id)

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered))
  }

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const saveData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    const updated = saveData.map((record) =>
      record.id === id ? { ...data } : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  return {
    saveFormData,
    getFormData,
    getAllSimulations,
    deleteSimulation,
    updateSimulation,
  }
}
