import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Rain() {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.002;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={5000}
          array={new Float32Array(5000 * 3).map(() => (Math.random() - 0.5) * 10)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="white" />
    </points>
  );
}

export default function Particles3D() {
  return (
    <Canvas className="particles-3d">
      <Rain />
    </Canvas>
  );
}