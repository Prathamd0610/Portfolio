import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';

// Heavy Three.js scene — lazy-loaded so it stays out of the critical bundle.
// Circulating wireframe torus — interactive (drag to spin) like the original.
const Hero3D = () => (
  <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} style={{ height: '100%' }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={0.8} />
    <Torus args={[1, 0.3, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#6366f1" wireframe />
    </Torus>
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
  </Canvas>
);

export default Hero3D;
