import { Inter } from "next/font/google"
import { getChatRooms } from "@/app/actions"
import { ChatSidebar } from "@/components/chat-sidebar"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const chats = await getChatRooms()

  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <ChatSidebar chats={chats} />
          <div className="flex flex-1 flex-col pl-[280px]">{children}</div>
        </div>
      </body>
    </html>
  )
}

