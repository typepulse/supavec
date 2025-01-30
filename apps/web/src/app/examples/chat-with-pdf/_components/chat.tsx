"use client";

import { useChat } from "ai/react";
import { CornerRightUp } from "lucide-react";
import { useState } from "react";

export const Chat = ({ fileId }: { fileId: string }) => {
  const [showResult, setShowResult] = useState(false);

  const { messages, isLoading, handleSubmit, input, setInput } = useChat({
    body: {
      fileId,
    },
    api: "/api/examples/chat-with-pdf",
    initialMessages: [],
    onResponse() {
      setShowResult(true);
    },
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    handleSubmit();
  };

  return (
    <div>
      <form className="relative" onSubmit={submitForm}>
        <textarea
          className="mx-auto h-[52px] flex border border-input px-3 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm max-w-xl bg-black/5 dark:bg-white/5 w-full rounded-2xl sm:rounded-3xl pl-10 sm:pl-12 pr-12 sm:pr-16 placeholder:text-black/70 dark:placeholder:text-white/70 border-none ring-black/30 dark:ring-white/30 text-black dark:text-white text-wrap py-3 sm:py-4 text-sm sm:text-base max-h-[200px] overflow-y-auto resize-none leading-[1.2] min-h-[52px]"
          placeholder="What do you want to ask?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 rounded-xl bg-black/5 dark:bg-white/5 py-1 px-1"
        >
          <CornerRightUp className="w-4 h-4 text-muted-foreground" />
        </button>
      </form>
      {isLoading && !showResult ? (
        <p>Loading...</p>
      ) : (
        <p>{messages.at(-1)?.content}</p>
      )}
    </div>
  );
};
