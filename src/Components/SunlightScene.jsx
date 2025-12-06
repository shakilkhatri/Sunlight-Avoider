import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";

const Sun = ({ azimuth, elevation }) => {
  const lightRef = useRef();
  
  // Convert degrees to radians
  const azimuthRad = (azimuth * Math.PI) / 180;
  const elevationRad = (elevation * Math.PI) / 180;

  // Cartesian conversion
  const radius = 20; 
  const y = radius * Math.sin(elevationRad);
  const x = radius * Math.cos(elevationRad) * Math.sin(azimuthRad);
  const z = radius * Math.cos(elevationRad) * Math.cos(azimuthRad);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.set(x, y, z);
      lightRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <directionalLight
        ref={lightRef}
        intensity={2.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0005}
        color="#fff"
      />
      
      {/* Visual representation of Sun */}
      <group position={[x, y, z]}>
        {/* Sun Sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
        
        {/* Sun Rays - "Lines all over" */}
        <group>
            {/* Set 1: XY Plane Burst */}
            {Array.from({ length: 12 }).map((_, i) => (
                <mesh key={`xy-${i}`} rotation={[0, 0, (i * Math.PI) / 6]}>
                   <cylinderGeometry args={[0.05, 0.05, 5, 8]} />
                   <meshBasicMaterial color="#FFD700" transparent opacity={0.6} />
                </mesh>
            ))}
            {/* Set 2: YZ Plane Burst */}
            {Array.from({ length: 12 }).map((_, i) => (
                <mesh key={`yz-${i}`} rotation={[(i * Math.PI) / 6, 0, 0]}>
                   <cylinderGeometry args={[0.05, 0.05, 5, 8]} />
                   <meshBasicMaterial color="#FFD700" transparent opacity={0.6} />
                </mesh>
            ))}
        </group>
      </group>
    </>
  );
};

const Vehicle = () => {
  return (
    <group position={[0, 0.95, 0]}> {/* Adjusted to sit perfectly on road (Wheel bot at -0.95 relative + 0.95 = 0.0) */}
      {/* Bus Body */}
      <RoundedBox args={[2.2, 1.2, 4.8]} radius={0.15} smoothness={4} position={[0, 0.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#ff3333" metalness={0.4} roughness={0.5} />
      </RoundedBox>
      
      {/* Windows - Left Side */}
      <mesh position={[1.11, 0.7, 0]} rotation={[0, 0, 0]} castShadow>
         <boxGeometry args={[0.05, 0.5, 3.8]} />
         <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>

       {/* Windows - Right Side */}
       <mesh position={[-1.11, 0.7, 0]} rotation={[0, 0, 0]} castShadow>
         <boxGeometry args={[0.05, 0.5, 3.8]} />
         <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.6, 2.41]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 0.05]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Rear Window */}
      <mesh position={[0, 0.6, -2.41]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 0.05]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Headlights */}
      <mesh position={[0.6, -0.2, 2.42]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#ffffcc" emissive="#ffffcc" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.6, -0.2, 2.42]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#ffffcc" emissive="#ffffcc" emissiveIntensity={2} />
      </mesh>

      {/* Taillights */}
      <mesh position={[0.6, -0.2, -2.42]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.6, -0.2, -2.42]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>

      {/* Wheels */}
      <mesh position={[1.1, -0.5, 1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.4, 32]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1.1, -0.5, 1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.4, 32]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.1, -0.5, -1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.4, 32]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1.1, -0.5, -1.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.4, 32]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
};

const Road = () => {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
      {/* Terrain/Ground */}
      <mesh receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color="#5ca45c" />
      </mesh>

      {/* Road Asphalt - Lightened for Shadow Visibility */}
      <mesh position={[0, 0, 0.02]} receiveShadow>
        <planeGeometry args={[12, 500]} />
        <meshStandardMaterial color="#444" roughness={0.6} />
      </mesh>

      {/* Dashed Center Line */}
      {Array.from({ length: 60 }).map((_, i) => (
        <mesh key={i} position={[0, -145 + i * 6, 0.04]}>
          <planeGeometry args={[0.4, 3]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}

      {/* Solid Side Lines */}
      <mesh position={[5.5, 0, 0.04]}>
        <planeGeometry args={[0.3, 500]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh position={[-5.5, 0, 0.04]}>
        <planeGeometry args={[0.3, 500]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
};

const SunlightScene = ({ sunAzimuth, sunElevation }) => {
  return (
    <div style={{ width: "100%", height: "500px", borderRadius: "20px", overflow: "hidden", background: "linear-gradient(to top, #87CEEB, #E0F7FA)" }}>
      <Canvas shadows camera={{ position: [30, 20, 30], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <Sun azimuth={sunAzimuth} elevation={sunElevation} />
        <Vehicle />
        <Road />
        <OrbitControls enableZoom={true} minDistance={10} maxDistance={80} maxPolarAngle={Math.PI / 2 - 0.05} />
      </Canvas>
    </div>
  );
};

export default SunlightScene;
