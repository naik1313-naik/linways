import { useMemo } from 'react';

const projects = [
  {
    title: 'Campus Analytics Dashboard',
    description: 'Real-time insights platform with modular charts and role-based controls.',
    link: '#',
  },
  {
    title: 'Admissions Experience',
    description: 'Conversion-focused enrollment funnel with streamlined workflows.',
    link: '#',
  },
  {
    title: 'Smart Timetable Engine',
    description: 'Constraint-aware scheduling system with operational optimization.',
    link: '#',
  },
];

export default function ProjectsSection() {
  const cards = useMemo(() => projects, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = -((y - rect.height / 2) / 18);
    const rotateY = (x - rect.width / 2) / 18;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="projects" className="section-container py-24">
      <div className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-300">Projects</p>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Featured Work</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="glass-panel group rounded-3xl p-6 text-slate-200 transition duration-300 hover:border-cyan-300/40"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className="mb-3 text-xl font-semibold text-white">{project.title}</h3>
            <p className="mb-5 text-sm text-slate-300">{project.description}</p>
            <span className="text-sm text-cyan-300 transition group-hover:text-cyan-200">View project →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
