import { Send } from 'lucide-react'
import { useState } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    const trimmed = message.trim()

    if (!trimmed || isLoading) {
      return
    }

    onSend(trimmed)
    setMessage('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className="bg-input flex items-center gap-2 rounded-full px-4 py-2">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Quais são os investimentos mais seguros..."
        disabled={isLoading}
        className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
      />
      <button
        aria-label="Enviar mensagem"
        disabled={isLoading || !message.trim()}
        onClick={handleSend}
        className="bg-primary flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send size={16} className="text-primary-foreground" />
      </button>
    </div>
  )
}
