'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ChatMessage, { ChatMessageModel } from '@/components/chatbot/ChatMessage';
import { AssistantContext, buildAssistantReply, getInitialContext } from '@/lib/chatbot/localAssistant';

type ChatWindowProps = {
  onClose: () => void;
};

const initialMessages: ChatMessageModel[] = [
  {
    id: 'init',
    role: 'assistant',
    content:
      'Bienvenue chez TimeTravel Agency. Je peux vous conseiller une destination, détailler les prix et vous guider avec un mini-diagnostic en 3 questions.'
  }
];

const initialSuggestions = ['Lancer la recommandation', 'Quels sont vos tarifs ?', 'Le voyage est-il sécurisé ?'];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessageModel[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<AssistantContext>(getInitialContext());
  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (rawInput?: string) => {
    const text = (rawInput ?? input).trim();
    if (!text || loading) return;

    const userMessage: ChatMessageModel = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    await wait(620);

    const { reply, context: nextContext, suggestions: nextSuggestions } = buildAssistantReply(text, context);
    setContext(nextContext);
    setSuggestions(nextSuggestions);

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply
      }
    ]);

    setLoading(false);
  };

  return (
    <div className="w-[min(92vw,400px)] overflow-hidden rounded-2xl border border-gold-700/50 bg-[#090c13] shadow-2xl">
      <div className="flex items-center justify-between border-b border-gold-700/35 bg-black/45 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-gold-100">Assistant TimeTravel</p>
          <p className="text-xs text-zinc-400">Mémoire contextuelle locale • sans API externe</p>
        </div>
        <button onClick={onClose} className="text-zinc-300 transition hover:text-gold-200" aria-label="Fermer le chat">
          ✕
        </button>
      </div>

      <div className="border-b border-gold-700/25 px-3 py-2">
        <div className="flex flex-wrap gap-2">
          {suggestions.slice(0, 4).map((prompt) => (
            <button
              key={prompt}
              onClick={() => void handleSend(prompt)}
              disabled={loading}
              className="rounded-full border border-gold-700/45 bg-gold-500/10 px-3 py-1 text-xs text-gold-200 transition hover:bg-gold-500/20 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div ref={listRef} className="max-h-[380px] space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading && (
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
            className="text-sm text-zinc-400"
          >
            L&apos;assistant prépare une réponse personnalisée...
          </motion.p>
        )}
      </div>

      <div className="border-t border-gold-700/35 p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                void handleSend();
              }
            }}
            placeholder="Posez-moi vos questions sur les voyages temporels..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-gold-400"
          />
          <button
            onClick={() => void handleSend()}
            className="rounded-xl border border-gold-400/70 bg-gold-500/20 px-4 py-2 text-sm font-semibold text-gold-100 transition hover:bg-gold-500/35 disabled:opacity-50"
            disabled={loading}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
