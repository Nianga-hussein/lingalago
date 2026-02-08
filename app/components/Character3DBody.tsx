"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type CharacterType = "man" | "woman" | "child";
type CharacterMood = "happy" | "encourage" | "celebrate" | "thinking";

const SKIN_TONES: Record<CharacterType, string> = {
  man: "#8D5524",
  woman: "#A0522D",
  child: "#C68642",
};

const CLOTHING: Record<CharacterType, { top: string; bottom: string; shoe: string }> = {
  man: { top: "#58CC02", bottom: "#2D5016", shoe: "#333" },
  woman: { top: "#FF6B6B", bottom: "#C0392B", shoe: "#333" },
  child: { top: "#1CB0F6", bottom: "#1A6B94", shoe: "#333" },
};

const HAIR_COLOR: Record<CharacterType, string> = {
  man: "#1a1a2e",
  woman: "#1a1a2e",
  child: "#1a1a2e",
};

interface Character3DBodyProps {
  character: CharacterType;
  mood: CharacterMood;
}

export default function Character3DBody({ character, mood }: Character3DBodyProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftForearmRef = useRef<THREE.Group>(null);
  const rightForearmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const leftBrowRef = useRef<THREE.Group>(null);
  const rightBrowRef = useRef<THREE.Group>(null);

  const skin = useMemo(() => new THREE.Color(SKIN_TONES[character]), [character]);
  const topColor = useMemo(() => new THREE.Color(CLOTHING[character].top), [character]);
  const bottomColor = useMemo(() => new THREE.Color(CLOTHING[character].bottom), [character]);
  const shoeColor = useMemo(() => new THREE.Color(CLOTHING[character].shoe), [character]);
  const hairColor = useMemo(() => new THREE.Color(HAIR_COLOR[character]), [character]);

  const isChild = character === "child";
  const isWoman = character === "woman";
  const scale = isChild ? 0.85 : 1;

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (!leftArmRef.current || !rightArmRef.current || !headRef.current || !bodyRef.current) return;

    // === BODY BREATHING / JUMPING ===
    if (mood === "celebrate") {
      // Jump animation
      const jumpPhase = (t * 3) % (Math.PI * 2);
      bodyRef.current.position.y = Math.abs(Math.sin(jumpPhase)) * 0.3;
    } else {
      // Subtle breathing
      bodyRef.current.position.y = Math.sin(t * 1.5) * 0.02;
    }

    // === LEFT ARM ===
    if (mood === "encourage") {
      // Waving gesture - arm raises and forearm waves back and forth
      leftArmRef.current.rotation.z = Math.sin(t * 2) * 0.3 + 1.8;
      if (leftForearmRef.current) {
        leftForearmRef.current.rotation.z = Math.sin(t * 5) * 0.4;
      }
    } else if (mood === "celebrate") {
      // Both arms raised high pumping
      leftArmRef.current.rotation.z = Math.sin(t * 4) * 0.15 + 2.5;
      if (leftForearmRef.current) {
        leftForearmRef.current.rotation.z = Math.sin(t * 6) * 0.2;
      }
    } else if (mood === "thinking") {
      // Hand on chin
      leftArmRef.current.rotation.z = 0.7;
      leftArmRef.current.rotation.x = -0.5;
      if (leftForearmRef.current) {
        leftForearmRef.current.rotation.z = 0.8;
      }
    } else {
      // Idle subtle sway
      leftArmRef.current.rotation.z = Math.sin(t * 0.8) * 0.05;
      leftArmRef.current.rotation.x = 0;
      if (leftForearmRef.current) {
        leftForearmRef.current.rotation.z = 0;
      }
    }

    // === RIGHT ARM ===
    if (mood === "celebrate") {
      rightArmRef.current.rotation.z = Math.sin(t * 4 + 0.5) * 0.15 - 2.5;
      if (rightForearmRef.current) {
        rightForearmRef.current.rotation.z = Math.sin(t * 6 + 0.5) * -0.2;
      }
    } else if (mood === "encourage") {
      // Relaxed idle
      rightArmRef.current.rotation.z = Math.sin(t * 0.8 + 1) * 0.05;
      if (rightForearmRef.current) {
        rightForearmRef.current.rotation.z = 0;
      }
    } else {
      rightArmRef.current.rotation.z = Math.sin(t * 0.8 + 1) * 0.05;
      if (rightForearmRef.current) {
        rightForearmRef.current.rotation.z = 0;
      }
    }

    // === HEAD ===
    if (mood === "thinking") {
      // Tilted head, looking sideways
      headRef.current.rotation.z = Math.sin(t * 0.5) * 0.05 + 0.15;
      headRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    } else if (mood === "celebrate") {
      // Nodding fast
      headRef.current.rotation.x = Math.sin(t * 5) * 0.12;
      headRef.current.rotation.z = 0;
      headRef.current.rotation.y = 0;
    } else if (mood === "encourage") {
      // Gentle side-to-side
      headRef.current.rotation.z = 0;
      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.08;
    } else {
      // Gentle slow nod
      headRef.current.rotation.x = Math.sin(t * 0.8) * 0.04;
      headRef.current.rotation.z = 0;
      headRef.current.rotation.y = 0;
    }

    // === EYES (pupils) ===
    if (leftEyeRef.current && rightEyeRef.current) {
      if (mood === "thinking") {
        // Look to the side
        leftEyeRef.current.position.x = Math.sin(t * 0.5) * 0.03 - 0.02;
        rightEyeRef.current.position.x = Math.sin(t * 0.5) * 0.03 - 0.02;
      } else if (mood === "celebrate") {
        // Eyes squint (scale down vertically)
        leftEyeRef.current.scale.y = 0.3;
        rightEyeRef.current.scale.y = 0.3;
      } else if (mood === "happy") {
        leftEyeRef.current.scale.y = 0.4;
        rightEyeRef.current.scale.y = 0.4;
      } else {
        leftEyeRef.current.scale.y = 1;
        rightEyeRef.current.scale.y = 1;
        leftEyeRef.current.position.x = Math.sin(t * 0.7) * 0.02;
        rightEyeRef.current.position.x = Math.sin(t * 0.7) * 0.02;
      }
    }

    // === EYEBROWS ===
    if (leftBrowRef.current && rightBrowRef.current) {
      if (mood === "thinking") {
        leftBrowRef.current.rotation.z = 0.15;
        rightBrowRef.current.rotation.z = -0.15;
        leftBrowRef.current.position.y = 0.06;
        rightBrowRef.current.position.y = 0.06;
      } else if (mood === "celebrate") {
        leftBrowRef.current.rotation.z = -0.1;
        rightBrowRef.current.rotation.z = 0.1;
        leftBrowRef.current.position.y = 0.1;
        rightBrowRef.current.position.y = 0.1;
      } else {
        leftBrowRef.current.rotation.z = 0;
        rightBrowRef.current.rotation.z = 0;
        leftBrowRef.current.position.y = 0.05;
        rightBrowRef.current.position.y = 0.05;
      }
    }

    // === MOUTH ===
    if (mouthRef.current) {
      if (mood === "celebrate") {
        mouthRef.current.scale.set(1.3, 1.5, 1);
      } else if (mood === "thinking") {
        mouthRef.current.scale.set(0.5, 0.5, 1);
      } else if (mood === "happy") {
        mouthRef.current.scale.set(1, 1.2, 1);
      } else {
        mouthRef.current.scale.set(1, 1, 1);
      }
    }

    // === LEGS ===
    if (leftLegRef.current && rightLegRef.current) {
      if (mood === "celebrate") {
        leftLegRef.current.rotation.x = Math.sin(t * 6) * 0.15;
        rightLegRef.current.rotation.x = Math.sin(t * 6 + Math.PI) * 0.15;
      } else {
        leftLegRef.current.rotation.x = 0;
        rightLegRef.current.rotation.x = 0;
      }
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <group ref={bodyRef}>
        {/* ========== LEGS ========== */}
        {/* Left leg */}
        <group ref={leftLegRef} position={[-0.18, -0.55, 0]}>
          <mesh position={[0, -0.25, 0]}>
            <capsuleGeometry args={[0.09, 0.35, 8, 16]} />
            <meshStandardMaterial color={bottomColor} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0.02, -0.55, 0.04]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={shoeColor} />
          </mesh>
        </group>

        {/* Right leg */}
        <group ref={rightLegRef} position={[0.18, -0.55, 0]}>
          <mesh position={[0, -0.25, 0]}>
            <capsuleGeometry args={[0.09, 0.35, 8, 16]} />
            <meshStandardMaterial color={bottomColor} />
          </mesh>
          {/* Shoe */}
          <mesh position={[-0.02, -0.55, 0.04]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={shoeColor} />
          </mesh>
        </group>

        {/* ========== TORSO ========== */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.28, 0.35, 16, 16]} />
          <meshStandardMaterial color={topColor} />
        </mesh>

        {/* Collar / neckline detail */}
        <mesh position={[0, 0.2, 0.2]} rotation={[0.5, 0, 0]}>
          <torusGeometry args={[0.1, 0.025, 8, 16, Math.PI]} />
          <meshStandardMaterial color={topColor} toneMapped={false} />
        </mesh>

        {/* ========== LEFT ARM ========== */}
        <group ref={leftArmRef} position={[-0.35, 0.1, 0]}>
          {/* Upper arm */}
          <mesh position={[-0.12, -0.08, 0]} rotation={[0, 0, 0.3]}>
            <capsuleGeometry args={[0.07, 0.22, 8, 16]} />
            <meshStandardMaterial color={skin} />
          </mesh>
          {/* Forearm */}
          <group ref={leftForearmRef} position={[-0.22, -0.2, 0]}>
            <mesh position={[0, -0.12, 0]}>
              <capsuleGeometry args={[0.06, 0.18, 8, 16]} />
              <meshStandardMaterial color={skin} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -0.28, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={skin} />
            </mesh>
            {/* Fingers (3 small capsules) */}
            <mesh position={[-0.04, -0.36, 0]} rotation={[0, 0, 0.2]}>
              <capsuleGeometry args={[0.02, 0.05, 4, 8]} />
              <meshStandardMaterial color={skin} />
            </mesh>
            <mesh position={[0, -0.38, 0]}>
              <capsuleGeometry args={[0.02, 0.06, 4, 8]} />
              <meshStandardMaterial color={skin} />
            </mesh>
            <mesh position={[0.04, -0.36, 0]} rotation={[0, 0, -0.2]}>
              <capsuleGeometry args={[0.02, 0.05, 4, 8]} />
              <meshStandardMaterial color={skin} />
            </mesh>
          </group>
        </group>

        {/* ========== RIGHT ARM ========== */}
        <group ref={rightArmRef} position={[0.35, 0.1, 0]}>
          {/* Upper arm */}
          <mesh position={[0.12, -0.08, 0]} rotation={[0, 0, -0.3]}>
            <capsuleGeometry args={[0.07, 0.22, 8, 16]} />
            <meshStandardMaterial color={skin} />
          </mesh>
          {/* Forearm */}
          <group ref={rightForearmRef} position={[0.22, -0.2, 0]}>
            <mesh position={[0, -0.12, 0]}>
              <capsuleGeometry args={[0.06, 0.18, 8, 16]} />
              <meshStandardMaterial color={skin} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -0.28, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={skin} />
            </mesh>
          </group>
        </group>

        {/* ========== NECK ========== */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.12, 16]} />
          <meshStandardMaterial color={skin} />
        </mesh>

        {/* ========== HEAD ========== */}
        <group ref={headRef} position={[0, 0.55, 0]}>
          {/* Head sphere */}
          <mesh>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color={skin} />
          </mesh>

          {/* === HAIR === */}
          {isWoman ? (
            <group>
              {/* Top hair bun / volume */}
              <mesh position={[0, 0.18, -0.02]}>
                <sphereGeometry args={[0.28, 16, 16]} />
                <meshStandardMaterial color={hairColor} />
              </mesh>
              {/* Side hair left */}
              <mesh position={[-0.25, -0.02, 0]}>
                <capsuleGeometry args={[0.06, 0.2, 8, 16]} />
                <meshStandardMaterial color={hairColor} />
              </mesh>
              {/* Side hair right */}
              <mesh position={[0.25, -0.02, 0]}>
                <capsuleGeometry args={[0.06, 0.2, 8, 16]} />
                <meshStandardMaterial color={hairColor} />
              </mesh>
              {/* Headwrap band */}
              <mesh position={[0, 0.12, 0.15]} rotation={[0.3, 0, 0]}>
                <torusGeometry args={[0.22, 0.04, 8, 32]} />
                <meshStandardMaterial color={CLOTHING[character].bottom} />
              </mesh>
              {/* Headwrap knot */}
              <mesh position={[0, 0.3, 0.08]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color={CLOTHING[character].bottom} />
              </mesh>
            </group>
          ) : isChild ? (
            <group>
              {/* Short curly hair */}
              <mesh position={[0, 0.14, 0]}>
                <sphereGeometry args={[0.27, 16, 16]} />
                <meshStandardMaterial color={hairColor} />
              </mesh>
              {/* Curls accents */}
              <mesh position={[-0.2, 0.18, 0.08]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color={hairColor} />
              </mesh>
              <mesh position={[0.2, 0.18, 0.08]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color={hairColor} />
              </mesh>
              <mesh position={[0, 0.26, 0.1]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshStandardMaterial color={hairColor} />
              </mesh>
            </group>
          ) : (
            <group>
              {/* Flat-top / short cut */}
              <mesh position={[0, 0.16, -0.02]}>
                <boxGeometry args={[0.45, 0.18, 0.42]} />
                <meshStandardMaterial color={hairColor} />
              </mesh>
              <mesh position={[0, 0.08, 0]}>
                <sphereGeometry args={[0.28, 16, 16]} />
                <meshStandardMaterial color={hairColor} />
              </mesh>
            </group>
          )}

          {/* === FACE === */}
          {/* Ears */}
          <mesh position={[-0.28, -0.02, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={skin} />
          </mesh>
          <mesh position={[0.28, -0.02, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={skin} />
          </mesh>

          {/* Eye whites */}
          <mesh position={[-0.1, 0.04, 0.26]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[0.1, 0.04, 0.26]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>

          {/* Pupils */}
          <mesh ref={leftEyeRef} position={[-0.1, 0.04, 0.32]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.1, 0.04, 0.32]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>

          {/* Eye highlights */}
          <mesh position={[-0.09, 0.06, 0.34]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.11, 0.06, 0.34]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
          </mesh>

          {/* Eyebrows */}
          <group ref={leftBrowRef} position={[-0.1, 0.12, 0.26]}>
            <mesh rotation={[0, 0, 0.1]}>
              <boxGeometry args={[0.08, 0.02, 0.02]} />
              <meshStandardMaterial color="#1a1a2e" />
            </mesh>
          </group>
          <group ref={rightBrowRef} position={[0.1, 0.12, 0.26]}>
            <mesh rotation={[0, 0, -0.1]}>
              <boxGeometry args={[0.08, 0.02, 0.02]} />
              <meshStandardMaterial color="#1a1a2e" />
            </mesh>
          </group>

          {/* Nose */}
          <mesh position={[0, -0.02, 0.3]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color={skin} />
          </mesh>

          {/* Mouth */}
          <mesh ref={mouthRef} position={[0, -0.1, 0.27]}>
            <capsuleGeometry args={[0.02, 0.06, 8, 16]} />
            <meshStandardMaterial color="#c0392b" />
          </mesh>

          {/* Blush cheeks */}
          <mesh position={[-0.18, -0.04, 0.2]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#FF6B6B" transparent opacity={0.25} />
          </mesh>
          <mesh position={[0.18, -0.04, 0.2]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#FF6B6B" transparent opacity={0.25} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
