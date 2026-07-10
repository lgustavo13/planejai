import { useState } from 'react'

import { HistoryCard } from '@/components/features/SimulationHistory/HistoryCard'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState(getAllSimulations)

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations((prev) => prev.filter((simulation) => simulation.id !== id))
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />

      {simulations.length === 0 && (
        <p className="text-muted-foreground text-center text-sm">
          Nenhuma simulação encontrada.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {simulations.map((simulation) => (
          <HistoryCard
            key={simulation.id}
            simulation={simulation}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  )
}
