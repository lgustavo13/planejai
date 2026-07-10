import { Clock, SquarePen, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import type { SimulationRecord } from '@/components/data/simulation'
import { Button } from '@/components/shared/Button'
import { calcMounthlySavings } from '@/utils/simulation'

interface HistoryCardProps {
  simulation: SimulationRecord
  onDelete: (id: string) => void
}

export function HistoryCard({ simulation, onDelete }: HistoryCardProps) {
  const navigate = useNavigate()

  const monthlySavings = calcMounthlySavings(simulation)

  const formattedSavings = `R$ ${monthlySavings.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  return (
    <div className="bg-card flex flex-col gap-4 rounded-2xl p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:flex-row lg:items-center lg:gap-6 lg:px-6 lg:py-5">
      <div className="flex items-center gap-3 lg:min-w-[180px]">
        <div className="bg-muted-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
          <Clock size={20} className="text-primary" />
        </div>
        <div>
          <p className="text-foreground text-sm font-semibold">
            {simulation.goalName}
          </p>
          <p className="text-muted-foreground text-xs">
            {simulation.createdAt}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-1 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex items-center justify-between lg:flex-col lg:items-start">
          <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Custo da Meta
          </span>
          <span className="text-foreground text-sm font-semibold">
            R$ {simulation.goalAmount}
          </span>
        </div>

        <div className="flex items-center justify-between lg:flex-col lg:items-start">
          <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Prazo
          </span>
          <span className="text-foreground text-sm font-semibold">
            {simulation.goalDeadLine} meses
          </span>
        </div>

        <div className="flex items-center justify-between lg:flex-col lg:items-start">
          <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Economia Mensal
          </span>
          <span className="text-foreground text-sm font-semibold">
            {formattedSavings}
          </span>
        </div>
      </div>

      <div className="bg-border h-px w-full lg:h-10 lg:w-px" />

      <div className="flex items-center justify-end gap-2">
        <button
          aria-label="Excluir simulação"
          className="cursor-pointer rounded-lg p-2 transition-opacity hover:opacity-80"
          onClick={() => onDelete(simulation.id)}
        >
          <Trash2 size={20} className="text-red-500" />
        </button>
        <Button
          variant="secondary"
          icon={SquarePen}
          onClick={() => void navigate(`/resultado/${simulation.id}`)}
        >
          Ver detalhes
        </Button>
      </div>
    </div>
  )
}
