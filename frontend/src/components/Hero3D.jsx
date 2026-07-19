import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Icosahedron } from '@react-three/drei';

// Heavy Three.js scene — lazy-loaded so it stays out of the critical bundle.
// A faceted citron "crystal" that floats gently, rotates, and reacts to drag.
const Hero3D = () => (
  <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 2]} style={{ height: '100%' }}>
    <ambientLight intensity={0.55} />
    <directionalLight position={[4, 6, 5]} intensity={1.8} />
    <pointLight position={[-5, -3, -2]} intensity={30} color="#c7f046" />
    <pointLight position={[5, 2, 4]} intensity={12} color="#ffffff" />
    <Float speed={1.6} rotationIntensity={1.5} floatIntensity={1.1}>
      {/* detail:1 → geodesic gem with crisp facets via flatShading */}
      <Icosahedron args={[1.35, 1]}>
        <meshStandardMaterial color="#cdf24a" flatShading roughness={0.28} metalness={0.45} />
      </Icosahedron>
    </Float>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2.2} />
  </Canvas>
);

export default Hero3D;
