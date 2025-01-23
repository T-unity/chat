"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatSidebarProps {
  chats: {
    id: string
    messages: {
      text: string
      sender: string
    }[]
  }[]
}

export function ChatSidebar({ chats }: ChatSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 z-20 flex h-full w-[280px] flex-col bg-muted/50">
      <div className="p-4">
        <Link href="/">
          <Button className="w-full" variant="default">
            <PlusCircle className="mr-2 h-4 w-4" />
            新しいチャット
          </Button>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2 p-2">
          {chats.map((chat) => {
            // 最初のメッセージをプレビューとして使用
            const preview = chat.messages[0]?.text || "New Chat"
            const truncatedPreview = preview.length > 25 ? preview.substring(0, 25) + "..." : preview

            return (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                  pathname === `/chat/${chat.id}` ? "bg-accent" : "transparent",
                )}
              >
                {truncatedPreview}
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
