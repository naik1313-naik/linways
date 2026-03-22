import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    const intro = gsap.fromTo(
      '.hero-intro',
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.2, ease: 'power3.out' },
    );

    const sections = gsap.utils.toArray<HTMLElement>('.animate-section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        },
      );
    });

    return () => {
      intro.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
