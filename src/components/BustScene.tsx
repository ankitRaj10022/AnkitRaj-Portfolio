import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Float } from "@react-three/drei";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

const BustModel = ({ scrollProgress }: { scrollProgress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation based on scroll
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        scrollProgress * Math.PI * 0.6 - 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        scrollProgress * 0.15 - 0.1,
        0.05
      );
    }
  });

  const darkMaterial = useMemo(
    () => ({
      color: "#1a1612",
      roughness: 0.35,
      metalness: 0.6,
      envMapIntensity: 0.8,
    }),
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={1.8}>
      {/* Head - elongated sphere */}
      <mesh ref={headRef} position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.65, 64, 64]} />
        <MeshDistortMaterial
          {...darkMaterial}
          distort={0.15}
          speed={1.5}
        />
      </mesh>

      {/* Face features - nose bridge */}
      <mesh position={[0, 1.15, 0.55]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.15]} />
        <meshStandardMaterial {...darkMaterial} />
      </mesh>

      {/* Brow ridge */}
      <mesh position={[0, 1.35, 0.45]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.15]} />
        <meshStandardMaterial {...darkMaterial} />
      </mesh>

      {/* Eye sockets */}
      <mesh position={[-0.18, 1.28, 0.48]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#0e0c0a" roughness={0.9} />
      </mesh>
      <mesh position={[0.18, 1.28, 0.48]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#0e0c0a" roughness={0.9} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.7, 32]} />
        <meshStandardMaterial {...darkMaterial} />
      </mesh>

      {/* Shoulders / bust base */}
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.55, 0.35, 32]} />
        <meshStandardMaterial {...darkMaterial} />
      </mesh>

      {/* Hair / crown - organic clusters */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.05}>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const r = 0.5 + Math.random() * 0.2;
          const yOff = 1.55 + Math.random() * 0.35;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * r * 0.7,
                yOff,
                Math.sin(angle) * r * 0.5,
              ]}
              rotation={[
                Math.random() * 0.5,
                Math.random() * Math.PI,
                Math.random() * 0.5,
              ]}
            >
              <dodecahedronGeometry args={[0.12 + Math.random() * 0.1, 0]} />
              <MeshDistortMaterial
                color="#141210"
                roughness={0.5}
                metalness={0.4}
                distort={0.3}
                speed={2}
              />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
};

interface BustSceneProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const BustSceneInner = ({ sectionRef }: BustSceneProps) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  return (
    <Canvas
      camera={{ position: [0, 1, 4], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />
      <directionalLight position={[-2, 3, -1]} intensity={0.4} color="#c4a882" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#e8d5b7" />
      <Environment preset="city" />
      <BustModelWrapper progressRef={progress} />
    </Canvas>
  );
};

const BustModelWrapper = ({
  progressRef,
}: {
  progressRef: React.RefObject<number>;
}) => {
  const ref = useRef(0);
  useFrame(() => {
    ref.current = progressRef.current ?? 0;
  });

  return <BustModelInner progressRef={progressRef} />;
};

const BustModelInner = ({
  progressRef,
}: {
  progressRef: React.RefObject<number>;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = progressRef.current ?? 0;
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        p * Math.PI * 0.6 - 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        p * 0.15 - 0.1,
        0.05
      );
    }
  });

  const darkMaterial = useMemo(
    () => ({
      color: "#1a1612",
      roughness: 0.35,
      metalness: 0.6,
      envMapIntensity: 0.8,
    }),
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={1.8}>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.65, 64, 64]} />
        <MeshDistortMaterial {...darkMaterial} distort={0.15} speed={1.5} />
      </mesh>
      <mesh position={[0, 1.15, 0.55]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.15]} />
        <meshStandardMaterial {...darkMaterial} />
      </mesh>
      <mesh position={[0, 1.35, 0.45]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.15]} />
        <meshStandardMaterial {...darkMaterial} />
      </mesh>
      <mesh position={[-0.18, 1.28, 0.48]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#0e0c0a" roughness={0.9} />
      </mesh>
      <mesh position={[0.18, 1.28, 0.48]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#0e0c0a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.7, 32]} />
        <meshStandardMaterial {...darkMaterial} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.6, 0.55, 0.35, 32]} />
        <meshStandardMaterial {...darkMaterial} />
      </mesh>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.05}>
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const r = 0.5 + Math.random() * 0.2;
          const yOff = 1.55 + Math.random() * 0.35;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * r * 0.7,
                yOff,
                Math.sin(angle) * r * 0.5,
              ]}
              rotation={[
                Math.random() * 0.5,
                Math.random() * Math.PI,
                Math.random() * 0.5,
              ]}
            >
              <dodecahedronGeometry args={[0.12 + Math.random() * 0.1, 0]} />
              <MeshDistortMaterial
                color="#141210"
                roughness={0.5}
                metalness={0.4}
                distort={0.3}
                speed={2}
              />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
};

export default BustSceneInner;
