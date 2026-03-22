import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PageAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const intro = gsap.timeline();
    intro
      .fromTo('.hero-title', { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .fromTo('.hero-subtitle', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.1)
      .fromTo('.hero-copy', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.25);

    gsap.utils.toArray<HTMLElement>('.about-animate, .project-card, #kudos .glass, #contact .glass').forEach((element) => {
      gsap.fromTo(
        element,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
          },
        },
      );
    });

    gsap.to('#hero canvas', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        scrub: true,
      },
    });

    return () => {
      intro.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
