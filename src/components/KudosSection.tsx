import { FormEvent, useEffect, useState } from 'react';

type KudosMessage = {
  name: string;
  message: string;
};

const STORAGE_KEY = 'linways-kudos';

export default function KudosSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<KudosMessage[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as KudosMessage[];
      setMessages(parsed);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const submitKudos = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      return;
    }

    const nextMessages = [{ name: trimmedName, message: trimmedMessage }, ...messages].slice(0, 10);
    setMessages(nextMessages);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMessages));
    setName('');
    setMessage('');
  };

  return (
    <section id="kudos" className="section-container py-24">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-3xl p-8">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-300">Kudos</p>
          <h2 className="mb-6 text-3xl font-semibold text-white">Leave a message</h2>
          <form className="space-y-4" onSubmit={submitKudos}>
            <label className="block text-sm text-slate-200">
              Name
              <input
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 outline-none transition focus:border-cyan-300"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                required
              />
            </label>
            <label className="block text-sm text-slate-200">
              Message
              <textarea
                className="mt-2 h-28 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 outline-none transition focus:border-cyan-300"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Share your thoughts"
                required
              />
            </label>
            <button
              className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
              type="submit"
            >
              Save kudos
            </button>
          </form>
        </div>

        <div className="glass-panel rounded-3xl p-8">
          <h3 className="mb-4 text-xl font-semibold text-white">Recent kudos</h3>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-sm text-slate-400">No messages yet. Be the first one to leave feedback.</p>
            ) : (
              messages.map((item, index) => (
                <article key={`${item.name}-${index}`} className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="mb-1 text-sm font-semibold text-cyan-300">{item.name}</p>
                  <p className="text-sm text-slate-300">{item.message}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
