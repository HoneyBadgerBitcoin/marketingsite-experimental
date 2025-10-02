import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

interface CryptoModelProps {
  modelPath: string;
  className?: string;
  opacity?: any; // MotionValue<number>
}

function AnimatedModel({
  modelPath,
  opacity,
}: {
  modelPath: string;
  opacity?: any;
}) {
  const modelRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  const [spinStarted, setSpinStarted] = useState(false);
  const startTime = useRef(Date.now());
  const prevTime = useRef(Date.now());
  const currentRotation = useRef(0);

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

  // No visibility observer needed anymore - animation starts immediately

  // Animate the model
  useFrame((state) => {
    if (modelRef.current) {
      const currentOpacity = opacity?.get() || 0;

      // Start animation only once when opacity reaches 0.5
      if (!spinStarted && currentOpacity >= 0.5) {
        setSpinStarted(true);
        startTime.current = Date.now();
        prevTime.current = Date.now();
        currentRotation.current = 0;
        modelRef.current.rotation.y = 0;
        modelRef.current.rotation.x = 0;
      }

      if (spinStarted && !initialAnimationComplete) {
        const now = Date.now();
        const deltaTime = (now - prevTime.current) / 1000; // Time since last frame in seconds
        const elapsed = (now - startTime.current) / 1000;
        const duration = 1.5; // Total animation duration

        if (elapsed < duration) {
          // Calculate smooth speed curve
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

          // Start very fast (15 rotations per second) and slow down
          const baseSpeed = 15 * Math.PI * 2; // 15 rotations per second
          const currentSpeed = baseSpeed * (1 - easeOut);

          // Accumulate rotation
          const deltaRotation = currentSpeed * deltaTime;
          currentRotation.current += deltaRotation;

          // Apply smooth rotation
          modelRef.current.rotation.y = currentRotation.current;

          // If nearly stopped
          if (easeOut > 0.99) {
            const twoPi = Math.PI * 2;
            currentRotation.current = Math.round(currentRotation.current / twoPi) * twoPi;
            modelRef.current.rotation.y = currentRotation.current;
            setInitialAnimationComplete(true);
          }
        } else {
          setInitialAnimationComplete(true);
        }

        prevTime.current = now;
        // Disable tilt during spin animation
        modelRef.current.rotation.x = 0;
      } else if (isHovering && initialAnimationComplete) {
        // Only enable tilt after spin is complete and during hover
        const targetRotationX = mousePosition.y * 0.6; // Further reduced tilt amount
        const targetRotationY = mousePosition.x * 0.6 + currentRotation.current; // Add to current rotation

        modelRef.current.rotation.x = THREE.MathUtils.lerp(
          modelRef.current.rotation.x,
          targetRotationX,
          0.1
        );
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
          modelRef.current.rotation.y,
          targetRotationY,
          0.1
        );
      } else if (initialAnimationComplete) {
        // Return to base rotation (not zero) when not hovering
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
          modelRef.current.rotation.x,
          0,
          0.1
        );
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
          modelRef.current.rotation.y,
          currentRotation.current, // Return to final spin position
          0.1
        );
      }

      // Keep scale consistent
      modelRef.current.scale.setScalar(1);

      // Position adjustment
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

function CryptoModel3D({
  modelPath,
  className = "",
  opacity,
}: CryptoModelProps) {
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
          powerPreference: "high-performance",
        }}
        dpr={[2, 3]} // Much higher pixel ratio for crisp rendering on high-DPI displays
        frameloop="always" // Continuous rendering to allow smooth spin animation independent of input events
      >
        {/* Subtle studio lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.2} />
        <pointLight position={[-3, -3, 3]} intensity={0.1} color="#7fa1ff" />
        <pointLight position={[3, -3, -3]} intensity={0.08} color="#a8c0ff" />

        {/* Environment for reflections with reduced intensity */}
        <Environment preset="studio" environmentIntensity={0.3} />

        {/* The animated model */}
        <AnimatedModel modelPath={modelPath} opacity={opacity} />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/Bitcoin.glb");

export default CryptoModel3D;
