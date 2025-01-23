"use client"

import { useState } from "react"
import { SendIcon } from "lucide-react"
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
    <form onSubmit={onSubmit} className="py-4">
      <div className="flex space-x-2">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[60px]"
        />
        <Button type="submit" disabled={isLoading} className="self-end">
          {isLoading ? (
            "Sending..."
          ) : (
            <>
              Send <SendIcon className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

