import { Bot, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const answers = [
  "Current review: repeated failed logins are the strongest signal in the dashboard.",
  "Recommendation: enable MFA for administrator accounts and monitor unfamiliar IP addresses.",
  "Predicted category: credential attack with suspicious IP behavior.",
  "Suggested demo step: run the simulator, review the alert, then download the PDF report."
];

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "CyberShield AI is monitoring authentication activity and risk signals." }
  ]);

  function sendMessage(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = formData.get("message")?.toString().trim();

    if (!text) return;

    setMessages((current) => [
      ...current,
      { role: "user", text },
      { role: "assistant", text: answers[Math.floor(Math.random() * answers.length)] }
    ]);
    event.currentTarget.reset();
  }

  return (
    <>
      <button
        aria-label="Open AI assistant"
        title="AI assistant"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cyber-cyan text-slate-950 shadow-neon"
      >
        <Bot className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            className="glass-panel fixed bottom-24 right-5 z-50 flex h-[440px] w-[min(380px,calc(100vw-32px))] flex-col rounded-lg"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5 text-cyber-cyan" />
                <div>
                  <p className="font-bold text-white light:text-slate-950">CyberShield Nitro</p>
                  <p className="text-xs text-cyber-lime">Online</p>
                </div>
              </div>
              <button
                aria-label="Close assistant"
                title="Close"
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-md px-3 py-2 text-sm ${
                    message.role === "assistant"
                      ? "bg-cyber-cyan/10 text-cyan-100 light:text-sky-900"
                      : "ml-auto bg-cyber-lime/15 text-lime-100 light:text-lime-900"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex gap-2 border-t border-white/10 p-4">
              <input
                name="message"
                placeholder="Ask about current security activity"
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none ring-cyber-cyan focus:ring-2 light:border-slate-200 light:bg-white/85 light:text-slate-950"
              />
              <button
                aria-label="Send message"
                title="Send"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-cyber-cyan text-slate-950"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
