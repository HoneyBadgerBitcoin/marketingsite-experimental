import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

interface CryptoModelProps {
  modelPath: string;
  className?: string;
}

function AnimatedModel({ modelPath }: { modelPath: string }) {
  const modelRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Load the GLB model
  const { scene } = useGLTF(modelPath);

  // Update mouse position and hover state
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("mouseenter", handleMouseEnter);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvas) {
        canvas.removeEventListener("mouseenter", handleMouseEnter);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Animate the model
  useFrame((state) => {
    if (modelRef.current) {
      // Strong tilting effects only on hover - no continuous rotation
      const targetRotationX = isHovering ? mousePosition.y * 1.2 : 0;
      const targetRotationY = isHovering ? mousePosition.x * 1.2 : 0;

      // Animate rotations
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotationX,
        isHovering ? 0.15 : 0.1
      );
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotationY,
        isHovering ? 0.15 : 0.1
      );

      // Keep scale consistent (no size change on hover)
      modelRef.current.scale.setScalar(1);

      // Move model down within canvas
      modelRef.current.position.y = -1.2;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive
        object={scene.clone()}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, 0]}
        rotation={[0, -0.3, 0]}
      />
    </group>
  );
}

function CryptoModel3D({ modelPath, className = "" }: CryptoModelProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[2, 3]} // Much higher pixel ratio for crisp rendering on high-DPI displays
        frameloop="demand" // Only render when needed for performance
      >
        {/* Subtle studio lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.2}
        />
        <pointLight position={[-3, -3, 3]} intensity={0.1} color="#7fa1ff" />
        <pointLight position={[3, -3, -3]} intensity={0.08} color="#a8c0ff" />
        
        {/* Environment for reflections with reduced intensity */}
        <Environment preset="studio" environmentIntensity={0.3} />
        
        {/* The animated model */}
        <AnimatedModel modelPath={modelPath} />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/Bitcoin.glb");

export default CryptoModel3D;
