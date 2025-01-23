"use client"

import { useState } from "react"
import { SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { sendMessage } from "@/app/actions"

interface ChatInputProps {
  chatRoomId: string
}

export function ChatInput({ chatRoomId }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    setIsLoading(true)
    try {
      await sendMessage(chatRoomId, message)
      setMessage("")
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative border-t bg-background py-4">
      <div className="relative flex max-w-2xl mx-auto items-end gap-2 px-4">
        <Textarea
          placeholder="メッセージを入力..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[60px] w-full resize-none rounded-lg border bg-background px-4 py-3 shadow-sm focus:border-black focus:ring-black"
          rows={5}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading}
          className="absolute right-6 bottom-[26px] h-8 w-8 rounded-lg bg-black text-white hover:bg-black/90"
        >
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">送信</span>
        </Button>
      </div>
    </form>
  )
}

