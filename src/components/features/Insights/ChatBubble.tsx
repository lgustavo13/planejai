interface ChatBubbleProps {
  role: 'user' | 'ai'
  content: string
}

const roleStyles = {
  user: {
    icon: '💬',
    label: 'Você',
  },
  ai: {
    icon: '✨',
    label: 'Resposta da IA',
  },
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const styles = roleStyles[role]

  return (
    <div className="bg-input rounded-2xl p-4">
      <div className="mb-2 flex items-center gap-1.5">
        <span>{styles.icon}</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          {styles.label}
        </span>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
    </div>
  )
}
