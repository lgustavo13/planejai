import { useCallback, useEffect, useState } from 'react'

import { buildAIPrompt } from '@/components/data/aiPrompt'
import { getInsight, type InsightData } from '@/services/aiService'

import { useSimulationStorage } from './useSimulationStorage'

export const useInsight = (id: string) => {
  const [insight, setInsight] = useState<InsightData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { getFormData } = useSimulationStorage()

  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const prompt = buildAIPrompt(simulation)
        const data = await getInsight(prompt)
        setInsight(data)
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    },
    [getFormData],
  )

  useEffect(() => {
    if (insight || isLoading || error) {
      return
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInsight(id)
  }, [id, isLoading, fetchInsight, insight, error])

  return { insight, isLoading, error, fetchInsight }
}
