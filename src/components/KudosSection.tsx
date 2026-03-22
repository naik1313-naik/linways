import { useEffect, useMemo, useState } from 'react';

type Kudos = {
  id: string;
  name: string;
  message: string;
};

const STORAGE_KEY = 'linways-kudos';

export default function KudosSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [kudos, setKudos] = useState<Kudos[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Kudos[];
      setKudos(Array.isArray(parsed) ? parsed : []);
    } catch {
      setKudos([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(kudos));
  }, [kudos]);

  const hasKudos = useMemo(() => kudos.length > 0, [kudos.length]);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) return;

    setKudos((prev) => [
      {
        id: crypto.randomUUID(),
        name: trimmedName,
        message: trimmedMessage,
      },
      ...prev,
    ]);

    setName('');
    setMessage('');
  };

  return (
    <section id="kudos" className="mx-auto w-[min(92%,1100px)] py-24">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="glass rounded-3xl p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-violet-300">Kudos</p>
          <h2 className="section-title">Share appreciation</h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm text-white/80">Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                placeholder="Your name"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-white/80">Message</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-28 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                placeholder="Your message"
                required
              />
            </label>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Send Kudos
            </button>
          </form>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-semibold">Community notes</h3>
          <div className="mt-5 space-y-4">
            {hasKudos ? (
              kudos.map((entry) => (
                <article key={entry.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-cyan-300">{entry.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{entry.message}</p>
                </article>
              ))
            ) : (
              <p className="text-sm text-white/65">No kudos yet. Be the first to leave a message.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
