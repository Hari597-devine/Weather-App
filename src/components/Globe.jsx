import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

export default function Globe() {
  return (
    <div className="globe glass">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />

        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial color="#4facfe" wireframe />
        </Sphere>

        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
}