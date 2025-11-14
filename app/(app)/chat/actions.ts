"use server";

import { Groq } from "groq-sdk";
import { syncUser } from "@/lib/user"; // Import our shared user function
import prisma from "@/lib/prisma"; // Import our shared prisma client
import { ChatMessage } from "@prisma/client";

// Get the API key from environment variables
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// This is the "persona" for our Career Bot
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
- You are powered by Groq and Llama 3, but you must refer to yourself as "CareerBot".
`;

// This is the type we'll use for messages in the React component
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
      take: 50, // Get the last 50 messages
    });

    // We map to the ClientChatMessage type to be safe
    return history.map((msg) => ({
      id: msg.id,
      role: msg.role as "user" | "model",
      content: msg.content,
    }));
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return []; // Return empty history on error
  }
}

// 2. ACTION: Send a new message and get a response
export async function sendNewMessage(
  userMessageContent: string
): Promise<ClientChatMessage | { error: string }> {
  let userId: string;

  // 1. Sync user and save their new message
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

  // 2. Get the full chat history to send to Groq
  const history = await prisma.chatMessage.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
    take: 50,
  });

  // Format messages for the Groq API (role: 'user' or 'assistant')
  const groqMessages = history.map((msg) => ({
    role: msg.role === "model" ? "assistant" : "user",
    content: msg.content,
  }));

  // 3. Call Groq API
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...groqMessages,
      ],
      model: "openai/gpt-oss-120b",
      temperature: 0.7, // A bit more creative than the analyzer
    });

    const aiResponseContent = chatCompletion.choices[0]?.message?.content;

    if (!aiResponseContent) {
      return { error: "The AI failed to provide a response." };
    }

    // 4. Save the AI's response to our database
    const aiMessage = await prisma.chatMessage.create({
      data: {
        userId,
        role: "model",
        content: aiResponseContent,
      },
    });

    // 5. Return the new AI message to the client
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
