"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createChatRoom } from "@/app/actions"

export function NewChat() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    setIsLoading(true)
    try {
      const chatRoomId = await createChatRoom(message)
      router.push(`/chat/${chatRoomId}`)
    } catch (error) {
      console.error("Failed to create chat:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl px-4">
      <div className="relative">
        <Textarea
          placeholder="メッセージを入力..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px] w-full resize-none rounded-lg border bg-background px-4 py-3 shadow-sm focus:border-black focus:ring-black"
          rows={8}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading}
          className="absolute right-2 bottom-2 h-8 w-8 rounded-lg bg-black text-white hover:bg-black/90"
        >
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">送信</span>
        </Button>
      </div>
    </form>
  )
}

