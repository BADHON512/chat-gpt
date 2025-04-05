'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense, useState, useEffect, useRef } from 'react';

export default function Game() {
  const birdRef = useRef();
  const [velocity, setVelocity] = useState([0, 0, 0]);

  const handleJump = () => {
    if (birdRef.current) {
      birdRef.current.setLinvel({ x: 0, y: 5, z: 0 });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="w-screen h-screen bg-blue-500" onClick={handleJump}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
                <Suspense fallback={null}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          
          <Physics>
            <RigidBody ref={birdRef} type="dynamic" position={[0, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="yellow" />
              </mesh>
            </RigidBody>
            
            <RigidBody type="static">
              <mesh position={[0, -2, 0]} receiveShadow>
                <boxGeometry args={[10, 0.5, 10]} />
                <meshStandardMaterial color="green" />
              </mesh>
            </RigidBody>
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}