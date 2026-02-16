import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { useScroll, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

const MODEL_PATH = "/models/bust.glb";

const BustModel = ({
  progressRef,
}: {
  progressRef: React.RefObject<number>;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d4c8b8"),
      roughness: 0.4,
      metalness: 0.2,
      envMapIntensity: 1.2,
    });

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = material;
      }
    });

    return clone;
  }, [scene]);

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

  return (
    <group ref={groupRef} position={[0, -15, 0]} scale={0.12}>
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

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={1.8} />
      <directionalLight position={[-2, 3, -1]} intensity={0.6} color="#c4a882" />
      <pointLight position={[0, 2, 3]} intensity={0.8} color="#e8d5b7" />
      <Environment preset="city" />
      <BustModel progressRef={progress} />
    </Canvas>
  );
};

export default BustSceneInner;
