import { notFound } from "next/navigation"
import prisma from "@/lib/db"
import { ChatMessages } from "@/components/chat-messages"
import { ChatInput } from "@/components/chat-input"

interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chatRoom = await prisma.chatRoom.findUnique({
    where: { id: params.id },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  })

  if (!chatRoom) {
    notFound()
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col flex-1">
        <main className="flex flex-col flex-1 bg-muted/50">
          <div className="container flex flex-col max-w-2xl mx-auto h-screen py-4">
            <ChatMessages initialMessages={chatRoom.messages} />
            <ChatInput chatRoomId={chatRoom.id} />
          </div>
        </main>
      </div>
    </div>
  )
}
