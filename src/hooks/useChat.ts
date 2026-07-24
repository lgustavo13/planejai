import { useCallback, useRef, useState } from 'react'

import { buildChatPrompt } from '@/components/data/aiPrompt'
import type {
  ChatMessage,
  SimulationRecord,
} from '@/components/data/simulation'
import { getChatAnswer } from '@/services/aiService'

import { useSimulationStorage } from './useSimulationStorage'

export const useChat = (simulationId: string) => {
  const isRequestPending = useRef(false)
  const { getFormData, updateSimulation } = useSimulationStorage()
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const simulation = getFormData(simulationId)
    return simulation?.chatMessages || []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (question: string) => {
      const simulation = getFormData(simulationId)

      if (!simulation || isRequestPending.current) {
        return
      }

      const userMessage: ChatMessage = { role: 'user', content: question }
      const updatedMessages = [...messages, userMessage]

      setMessages(updatedMessages)
      isRequestPending.current = true
      setIsLoading(true)
      setError(null)

      try {
        const prompt = buildChatPrompt(simulation, question)
        const answer = await getChatAnswer(prompt)

        const aiMessage: ChatMessage = { role: 'ai', content: answer }
        const allMessages = [...updatedMessages, aiMessage]

        setMessages(allMessages)

        updateSimulation(simulationId, {
          ...simulation,
          chatMessages: allMessages,
        } as SimulationRecord)
      } catch {
        setError('Erro ao enviar a mensagem. Tente novamente.')
      } finally {
        isRequestPending.current = false
        setIsLoading(false)
      }
    },
    [simulationId, messages, getFormData, updateSimulation],
  )

  return { messages, isLoading, error, sendMessage }
}
