import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TypewriterKey({ position, width = 0.08, height = 0.04, depth = 0.08 }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
    </mesh>
  );
}

function TypewriterBody() {
  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.15, 0.8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.6} />
      </mesh>
      
      {/* Back panel / paper holder */}
      <mesh position={[0, 0.25, -0.35]}>
        <boxGeometry args={[1.1, 0.5, 0.08]} />
        <meshStandardMaterial color="#1f1f1f" metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Paper */}
      <mesh position={[0, 0.35, -0.3]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshStandardMaterial color="#d4c5a9" side={THREE.DoubleSide} roughness={0.9} />
      </mesh>
      
      {/* Carriage */}
      <mesh position={[0, 0.12, -0.1]}>
        <boxGeometry args={[1.3, 0.08, 0.15]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Platen (roller) */}
      <mesh position={[0, 0.18, -0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 1.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
      </mesh>
      
      {/* Platen knobs */}
      <mesh position={[-0.6, 0.18, -0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
        <meshStandardMaterial color="#8b7355" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.6, 0.18, -0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
        <meshStandardMaterial color="#8b7355" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Keyboard() {
  const keys = useMemo(() => {
    const keyPositions = [];
    // Row 1 - Numbers
    for (let i = 0; i < 10; i++) {
      keyPositions.push([
        -0.45 + i * 0.1,
        0.1,
        0.25,
      ]);
    }
    // Row 2 - QWERTY
    for (let i = 0; i < 10; i++) {
      keyPositions.push([
        -0.42 + i * 0.1,
        0.1,
        0.35,
      ]);
    }
    // Row 3 - ASDF
    for (let i = 0; i < 9; i++) {
      keyPositions.push([
        -0.38 + i * 0.1,
        0.1,
        0.45,
      ]);
    }
    // Row 4 - ZXCV
    for (let i = 0; i < 7; i++) {
      keyPositions.push([
        -0.32 + i * 0.1,
        0.1,
        0.55,
      ]);
    }
    return keyPositions;
  }, []);

  return (
    <group>
      {keys.map((pos, i) => (
        <TypewriterKey key={i} position={pos} />
      ))}
      {/* Spacebar */}
      <mesh position={[0, 0.1, 0.65]}>
        <boxGeometry args={[0.4, 0.04, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

function TypeArms() {
  const armsRef = useRef();
  
  useFrame((state) => {
    // Subtle animation of type arms
    if (armsRef.current) {
      const time = state.clock.elapsedTime;
      armsRef.current.children.forEach((arm, i) => {
        const offset = Math.sin(time * 3 + i * 0.5) * 0.02;
        arm.rotation.x = -0.3 + offset;
      });
    }
  });

  const arms = useMemo(() => {
    const armPositions = [];
    for (let i = 0; i < 20; i++) {
      armPositions.push(-0.45 + i * 0.048);
    }
    return armPositions;
  }, []);

  return (
    <group ref={armsRef} position={[0, 0.15, -0.05]}>
      {arms.map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.015, 0.25, 0.01]} />
          <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function Typewriter3D({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <TypewriterBody />
      <Keyboard />
      <TypeArms />
      
      {/* Ambient glow underneath */}
      <pointLight position={[0, -0.2, 0]} intensity={0.5} color="#d4a574" distance={2} />
    </group>
  );
}
