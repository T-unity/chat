"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SendIcon } from "lucide-react"
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
    <form onSubmit={onSubmit} className="w-full max-w-xl">
      <div className="flex flex-col space-y-4">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={isLoading} className="self-end">
          {isLoading ? (
            "Creating chat..."
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

