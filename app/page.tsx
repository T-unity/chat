import { NewChat } from "@/components/new-chat"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col flex-1">
        <main className="flex flex-col flex-1 bg-muted/50">
          <div className="container flex flex-col items-center justify-center flex-1 max-w-2xl mx-auto py-20">
            <h1 className="text-3xl font-bold tracking-tight mb-8">What can I help you with?</h1>
            <NewChat />
          </div>
        </main>
      </div>
    </div>
  )
}
