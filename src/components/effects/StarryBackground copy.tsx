import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"

export const StarryBackground = () => {
  return (
    <Canvas className="absolute inset-0">
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} speed={1} />
    </Canvas>
  )
}

