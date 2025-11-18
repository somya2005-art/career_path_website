"use server";

import { Groq } from "groq-sdk";
import { syncUser } from "@/lib/user";
import prisma from "@/lib/prisma";
import { ChatMessage } from "@prisma/client";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `
You are "CareerBot," a friendly, professional, and highly knowledgeable career coach.
Your goal is to help users with all aspects of their career development.
You can:
- Give resume and cover letter advice.
- Suggest career paths based on skills.
- Provide job-seeking strategies.
- Help prepare for interviews.
- Answer questions about different industries.

RULES:
- Always be polite, encouraging, and professional.
- Keep your answers concise and actionable (use bullet points).
- If the user asks a question unrelated to careers, gently guide them back to the topic.
- You are powered by Groq and OpenAI OSS GPT, but you must refer to yourself as "CareerBot".
`;

export type ClientChatMessage = {
  id: string;
  role: "user" | "model";
  content: string;
};

// 1. ACTION: Get the user's entire chat history
export async function getChatHistory(): Promise<ClientChatMessage[]> {
  try {
    const user = await syncUser();

    const history = await prisma.chatMessage.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
      take: 50,
    });

    return history.map((msg) => ({
      id: msg.id,
      role: msg.role as "user" | "model",
      content: msg.content,
    }));
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
}

// 2. ACTION: Send a new message and get a response
export async function sendNewMessage(
  userMessageContent: string
): Promise<ClientChatMessage | { error: string }> {
  let userId: string;

  try {
    const user = await syncUser();
    userId = user.id;

    await prisma.chatMessage.create({
      data: {
        userId,
        role: "user",
        content: userMessageContent,
      },
    });
  } catch (error) {
    console.error("Error saving user message:", error);
    return { error: "Failed to save your message." };
  }

  const history = await prisma.chatMessage.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
    take: 50,
  });

  const groqMessages = history.map((msg) => ({
    role: msg.role === "model" ? "assistant" : "user",
    content: msg.content,
  }));

  try {
    const chatCompletion = await groq.chat.completions.create({
      // --- THIS IS THE FIX ---
      // We cast the messages array to 'any' to stop TypeScript
      // from complaining about the specific 'role' string types.
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...groqMessages,
      ] as any,
      // --- END OF FIX ---

      model: "openai/gpt-oss-120b", // Using the standard efficient model
      temperature: 0.7,
    });

    const aiResponseContent = chatCompletion.choices[0]?.message?.content;

    if (!aiResponseContent) {
      return { error: "The AI failed to provide a response." };
    }

    const aiMessage = await prisma.chatMessage.create({
      data: {
        userId,
        role: "model",
        content: aiResponseContent,
      },
    });

    return {
      id: aiMessage.id,
      role: "model",
      content: aiMessage.content,
    };
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return { error: "An error occurred while getting a response." };
  }
}
