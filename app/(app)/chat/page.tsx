"use client";

import { useState, useEffect, useRef } from "react";
import { getChatHistory, sendNewMessage, ClientChatMessage } from "./actions";
import { useUser } from "@clerk/nextjs";
import { Bot, User, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LoaderFive } from "@/components/ui/loader";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function ChatPage() {
  const [messages, setMessages] = useState<ClientChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true); // Start in loading state
  const { user } = useUser();

  const viewportRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);

  /* Load history once */
  useEffect(() => {
    (async () => {
      const history = await getChatHistory();
      setMessages(history);
      setIsHistoryLoading(false); // Set loading to false *after* history is loaded
    })();
  }, []);

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    // This is the working scroll logic
    const scrollTimer = setTimeout(() => {
      if (shouldAutoScroll.current) {
        el.scrollTo({
          top: el.scrollHeight,
          behavior: isHistoryLoading ? "auto" : "smooth",
        });
      }
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [messages, isHistoryLoading]); // Run when history is loaded and when messages change

  /* Detect user scroll */
  const handleScroll = () => {
    const el = viewportRef.current;
    if (!el) return;

    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;

    shouldAutoScroll.current = atBottom;
  };

  /* Normal (non-streaming) submit */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form.querySelector("input") as HTMLInputElement;
    const text = input.value.trim();
    if (!text || isLoading) return;

    input.value = "";
    setIsLoading(true);
    shouldAutoScroll.current = true;

    const userMsg: ClientChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);

    const result = await sendNewMessage(text);
    if ("error" in result) {
      setMessages((prev) => prev.slice(0, -1));
      setIsLoading(false);
      return;
    }

    setMessages((prev) => [...prev, result]);
    setIsLoading(false);
  }

  return (
    // This is the layout that works with your layout.tsx
    <div className="relative w-full h-full flex flex-col max-w-4xl mx-auto px-4 pt-6 pb-25">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-white [text-shadow:_0_0_12px_purple]">
          Career Bot
        </h1>
      </div>

      {/* Chat viewport - This is the main scrolling area */}
      <div
        ref={viewportRef}
        onScroll={handleScroll}
        className="flex-1 overflow-auto space-y-4 pb-4"
      >
        {isHistoryLoading && (
          <div className="flex justify-center items-center h-40">
            <LoaderFive text="Loading chat..." />
          </div>
        )}

        {!isHistoryLoading && messages.length === 0 && (
          <div className="text-center text-neutral-500 py-12">
            Start a conversation below.
          </div>
        )}

        {messages.map((m) => (
          <ChatBubble key={m.id} message={m} userImageUrl={user?.imageUrl} />
        ))}

        {isLoading && <TypingBubble />}
      </div>

      {/* Sticky input */}
      <div className="fixed bottom-4 left-15 right-0 pointer-events-none">
        <div className="max-w-8xl mx-auto px-4 pointer-events-auto">
          <PlaceholdersAndVanishInput
            placeholders={[
              "How do I improve my resume?",
              "Which career path fits me?",
              "Help me prepare for interviews.",
              "Rewrite my bullet points…",
            ]}
            onChange={() => {}}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------- Chat Bubble -------------------- */
function ChatBubble({
  message,
  userImageUrl,
}: {
  message: ClientChatMessage;
  userImageUrl?: string;
}) {
  const isUser = message.role === "user";
  const sharedStyles =
    "max-w-[78%] rounded-2xl px-4 py-2 shadow-sm text-sm leading-relaxed prose prose-invert prose-sm";
  const userStyles =
    "bg-white/10 text-white backdrop-blur border border-white/10";
  const aiStyles = "bg-white/6 text-white border border-white/6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && <AvatarBot />}
      <div className={cn(sharedStyles, isUser ? userStyles : aiStyles)}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>
      </div>
      {isUser && <AvatarUser imageUrl={userImageUrl} />}
    </motion.div>
  );
}

/* -------------------- Avatars -------------------- */
const AvatarBot = () => (
  <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
    <Bot className="w-4 h-4 text-white" />
  </div>
);

const AvatarUser = ({ imageUrl }: { imageUrl?: string }) => (
  <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center shrink-0">
    {imageUrl ? (
      <img src={imageUrl} className="w-full h-full" />
    ) : (
      <User className="w-4 h-4 text-white" />
    )}
  </div>
);

/* -------------------- Typing Indicator -------------------- */
function TypingBubble() {
  return (
    <div className="flex gap-3 items-center">
      <AvatarBot />
      <div className="px-4 py-2 rounded-2xl bg-neutral-900 border border-white/6 text-neutral-400 text-sm">
        <TypingDots />
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center">
      <span className="block w-2 h-2 bg-neutral-400 rounded-full animate-pulse"></span>
      <span className="block w-2 h-2 bg-neutral-400 rounded-full animate-pulse delay-150"></span>
      <span className="block w-2 h-2 bg-neutral-400 rounded-full animate-pulse delay-300"></span>
    </div>
  );
}
