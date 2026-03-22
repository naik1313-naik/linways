import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Mesh } from 'three';

function RotatingShape() {
  const meshRef = useRef<Mesh>(null);
  const colors = useMemo(() => ['#7e5fff', '#00d4ff', '#d946ef'], []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.55;
    meshRef.current.rotation.y += delta * 0.8;
  });

  return (
    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial color={colors[0]} metalness={0.5} roughness={0.25} wireframe />
      </mesh>
    </Float>
  );
}

function ScrollCameraRig() {
  const { camera } = useThree();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Track vertical scroll to animate camera depth while user explores the hero.
    const onScroll = () => {
      const max = window.innerHeight || 1;
      setScrollProgress(Math.min(window.scrollY / max, 1));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(() => {
    const targetZ = 4 - scrollProgress * 1.5;
    const targetY = scrollProgress * 0.4;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} className="h-full w-full">
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 3]} intensity={1.1} color="#00d4ff" />
      <pointLight position={[-2, -2, -2]} intensity={1.2} color="#7e5fff" />
      <RotatingShape />
      <ScrollCameraRig />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
    </Canvas>
  );
}
