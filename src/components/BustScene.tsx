import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { useScroll, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

const MODEL_PATH = "/models/bust.glb";

const BustModel = ({
  progressRef,
  isDark,
}: {
  progressRef: React.RefObject<number>;
  isDark: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(isDark ? "#8b7ec8" : "#f5e6c8"),
      roughness: isDark ? 0.25 : 0.35,
      metalness: isDark ? 0.4 : 0.15,
      envMapIntensity: isDark ? 1.8 : 1.2,
    });

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = material;
      }
    });

    return clone;
  }, [scene, isDark]);

  useFrame(() => {
    const p = progressRef.current ?? 0;
    if (groupRef.current) {
      const time = Date.now() * 0.001;
      const idleRotY = Math.sin(time * 0.5) * 0.3;
      const scrollRotY = p * Math.PI * 0.6 - 0.3;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        scrollRotY + idleRotY,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        Math.sin(time * 0.3) * 0.08 + p * 0.15 - 0.1,
        0.04
      );
      groupRef.current.position.y = -0.5 + Math.sin(time * 1.2) * 0.06;
      const s = 4.5 + Math.sin(time * 0.8) * 0.05;
      groupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={4.5}>
      <primitive object={clonedScene} />
    </group>
  );
};

useGLTF.preload(MODEL_PATH);

interface BustSceneProps {
  sectionRef: React.RefObject<HTMLElement>;
}

const BustSceneInner = ({ sectionRef }: BustSceneProps) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useRef(0);
  const isDark = document.documentElement.classList.contains("dark");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={isDark ? 0.4 : 0.8} />
      <directionalLight position={[3, 5, 2]} intensity={isDark ? 1.5 : 2.5} color={isDark ? "#a78bfa" : "#ffffff"} />
      <directionalLight position={[-3, 3, -1]} intensity={isDark ? 1.5 : 1.2} color={isDark ? "#e84393" : "#e84393"} />
      <pointLight position={[0, 3, 4]} intensity={isDark ? 1.5 : 1.0} color={isDark ? "#00cec9" : "#fdcb6e"} />
      <pointLight position={[-2, -1, 3]} intensity={isDark ? 1.0 : 0.6} color={isDark ? "#e84393" : "#74b9ff"} />
      <spotLight position={[0, 5, 0]} intensity={isDark ? 2.0 : 1.5} angle={0.5} penumbra={0.5} color={isDark ? "#a78bfa" : "#ffffff"} />
      <Environment preset={isDark ? "night" : "city"} />
      <BustModel progressRef={progress} isDark={isDark} />
    </Canvas>
  );
};

export default BustSceneInner;
