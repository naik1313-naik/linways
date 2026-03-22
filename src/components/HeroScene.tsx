import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, Stars } from '@react-three/drei';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { Mesh } from 'three';

function AnimatedOrb() {
  const orbRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!orbRef.current) {
      return;
    }

    const scrollProgress = Math.min(window.scrollY / window.innerHeight, 1.5);
    orbRef.current.rotation.y += 0.01;
    orbRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    orbRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 - scrollProgress * 0.6;
  });

  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={orbRef}>
        <icosahedronGeometry args={[1.3, 2]} />
        <MeshDistortMaterial color="#67e8f9" distort={0.35} speed={2.4} roughness={0.2} metalness={0.6} />
      </mesh>
    </Float>
  );
}

function ScrollCamera() {
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    const updateCamera = () => {
      if (!cameraRef.current) {
        return;
      }

      const progress = Math.min(window.scrollY / window.innerHeight, 1.4);
      gsap.to(cameraRef.current.position, {
        x: progress * 0.7,
        y: progress * -0.6,
        z: 4 - progress,
        duration: 0.6,
        overwrite: 'auto',
      });
    };

    window.addEventListener('scroll', updateCamera, { passive: true });
    return () => window.removeEventListener('scroll', updateCamera);
  }, []);

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.3, 4]} fov={50} />;
}

export default function HeroScene() {
  return (
    <Canvas className="h-full w-full" gl={{ antialias: true }}>
      <color attach="background" args={['#020617']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} color="#a5f3fc" />
      <pointLight position={[-3, -2, -1]} intensity={1.2} color="#c084fc" />
      <ScrollCamera />
      <AnimatedOrb />
      <Stars radius={60} depth={35} count={4000} factor={3} saturation={0.2} speed={0.5} />
    </Canvas>
  );
}
