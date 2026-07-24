import 'react-loading-skeleton/dist/skeleton.css'

import { useEffect, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'

import { useChat } from '@/hooks/useChat'
import { useInsight } from '@/hooks/useInsight'

import { ChatBubble } from '../Insights/ChatBubble'
import { ChatInput } from '../Insights/ChatInput'
import { Content } from '../Insights/Content'
import { Error } from '../Insights/Error'

interface AIInsightCardProps {
  simulationId: string
}

export function AIInsightCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId)
  const {
    messages,
    isLoading: isChatLoading,
    error: chatError,
    sendMessage,
  } = useChat(simulationId)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isChatLoading])

  return (
    <div className="bg-card order-2 flex flex-col rounded-2xl shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="px-6 pt-6 pb-3">
        <div className="items-center gap-1.5">
          <span>✨</span>
          <span>Insight Financeiro Personalizado</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 lg:max-h-[500px]"
      >
        {isLoading && (
          <div className="flex">
            <Skeleton
              count={10.5}
              baseColor="var(--color-skeleton-base)"
              highlightColor="var(--color-skeleton-highlight)"
              className="mb-3 flex rounded-lg"
              containerClassName="flex-1"
              inline
            />
          </div>
        )}
        {!isLoading && error && (
          <Error
            simulationId={simulationId}
            message={error}
            onRetry={() => fetchInsight(simulationId)}
          />
        )}
        {!isLoading && insight && !error && <Content insight={insight} />}

        {messages.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
          </div>
        )}

        {isChatLoading && (
          <div className="bg-input mt-4 rounded-2xl p-4">
            <div className="mb-2 flex items-center gap-1.5">
              <span>✨</span>
              <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                Resposta da IA
              </span>
            </div>
            <Skeleton
              count={3}
              baseColor="var(--color-skeleton-base)"
              highlightColor="var(--color-skeleton-highlight)"
              className="mb-1 rounded"
              containerClassName="flex-1"
            />
          </div>
        )}

        {chatError && (
          <p className="mt-3 text-center text-sm text-red-500">
            ⚠️ {chatError}
          </p>
        )}
      </div>

      {!isLoading && insight && !error && (
        <div className="px-6 pt-4 pb-6">
          <ChatInput
            onSend={(question) => void sendMessage(question)}
            isLoading={isChatLoading}
          />
        </div>
      )}
    </div>
  )
}
