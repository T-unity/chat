"use server"

import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createChatRoom(message: string) {
  // Create a new chat room
  const chatRoom = await prisma.chatRoom.create({
    data: {
      messages: {
        create: {
          text: message,
          sender: "user",
        },
      },
    },
  })

  // Generate AI response
  const { text } = await generateText({
    model: openai("gpt-4o"),
    messages: [{ role: "user", content: message }],
  })

  // Save AI response
  await prisma.message.create({
    data: {
      text,
      sender: "assistant",
      chatRoomId: chatRoom.id,
    },
  })

  revalidatePath("/")
  return chatRoom.id
}

export async function sendMessage(chatRoomId: string, message: string) {
  // Get previous messages for context
  const previousMessages = await prisma.message.findMany({
    where: { chatRoomId },
    orderBy: { createdAt: "asc" },
  })

  // Save user message
  await prisma.message.create({
    data: {
      text: message,
      sender: "user",
      chatRoomId,
    },
  })

  // Generate AI response with context
  const { text } = await generateText({
    model: openai("gpt-4o"),
    messages: [
      ...previousMessages.map((msg) => ({
        role: msg.sender as "user" | "assistant",
        content: msg.text,
      })),
      { role: "user", content: message },
    ],
  })

  // Save AI response
  await prisma.message.create({
    data: {
      text,
      sender: "assistant",
      chatRoomId,
    },
  })

  revalidatePath(`/chat/${chatRoomId}`)
  return text
}

export async function getChatRooms() {
  const chatRooms = await prisma.chatRoom.findMany({
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return chatRooms
}
