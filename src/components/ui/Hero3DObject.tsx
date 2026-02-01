"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Float, Stars, Sparkles, Cloud } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function ChipGeometry() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.002;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <group ref={ref}>
       {/* Main Board Base */}
       <mesh>
        <boxGeometry args={[3, 2, 0.2]} />
        <meshPhysicalMaterial 
            color="#050505" 
            metalness={0.9} 
            roughness={0.1}
            clearcoat={1}
            emissive="#001133"
            emissiveIntensity={0.2}
        />
       </mesh>

       {/* Glowing Circuit Lines */}
       <mesh position={[0, 0, 0.11]}>
         <planeGeometry args={[2.8, 1.8]} />
         <meshBasicMaterial color="#000000" />
       </mesh>

       {/* Central Core */}
        <mesh position={[0, 0, 0.15]}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
            <meshStandardMaterial 
                color="#00afff" 
                emissive="#00afff"
                emissiveIntensity={3}
                toneMapped={false}
            />
        </mesh>

        {/* Outer Ring */}
        <mesh position={[0, 0, 0.15]}>
            <torusGeometry args={[0.8, 0.02, 16, 64]} />
             <meshStandardMaterial 
                color="#00afff" 
                emissive="#00afff"
                emissiveIntensity={2}
                toneMapped={false}
            />
        </mesh>
        
        {/* Decorative elements */}
        <mesh position={[1.2, 0.7, 0.1]}>
            <boxGeometry args={[0.2, 0.2, 0.1]} />
             <meshStandardMaterial color="#00afff" emissive="#00afff" emissiveIntensity={2} />
        </mesh>
         <mesh position={[-1.2, -0.7, 0.1]}>
            <boxGeometry args={[0.2, 0.2, 0.1]} />
             <meshStandardMaterial color="#00afff" emissive="#00afff" emissiveIntensity={2} />
        </mesh>
    </group>
  );
}

export default function Hero3DObject() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={['#050505', 5, 20]} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00afff" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#ff0088" />
        
        <Center>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <ChipGeometry />
            </Float>
        </Center>
        
        {/* Immersive Environment */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Cloud opacity={0.3} speed={0.2} bounds={[10, 2, 2]} segments={20} position={[0, -2, -5]} color="#001133" />
        
        {/* Foreground Sparkles */}
        <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.8} color="#00afff" />
        {/* Background Sparkles */}
         <Sparkles count={200} scale={20} size={3} speed={0.2} opacity={0.3} color="#ffffff" />
         
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
