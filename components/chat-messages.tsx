"use client"

import { useEffect, useRef } from "react"
import type { Message } from "@prisma/client"

interface ChatMessagesProps {
  initialMessages: Message[]
}

export function ChatMessages({ initialMessages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [initialMessages])

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-4">
      {initialMessages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`rounded-lg px-4 py-2 max-w-[80%] ${
              message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

