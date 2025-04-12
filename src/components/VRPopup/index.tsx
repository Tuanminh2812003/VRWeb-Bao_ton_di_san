import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Text, RoundedBox } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

interface VRPopupProps {
  visible: boolean;
  content: string;
  position?: [number, number, number];
  imageInfo?: string; // ⬅️ thêm props này
  onClose?: () => void;
}

export default function VRPopup3D({
  visible,
  content,
  position = [0, 2, -3],
  onClose,
}: VRPopupProps) {
  const popupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const posVec = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(() => {
    if (popupRef.current) {
      const camWorldPos = new THREE.Vector3();
      camera.getWorldPosition(camWorldPos);
      popupRef.current.lookAt(camWorldPos);
    }
  });

  if (!visible) return null;

  return (
    <group ref={popupRef} position={posVec}>
      <RoundedBox args={[2.5, 2, 0.1]} radius={0.1}>
        <meshBasicMaterial color="black" transparent opacity={0.7} />
      </RoundedBox>

      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        maxWidth={2.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {content}
      </Text>

      <mesh
        position={[1.1, 0.8, 0.07]}
        onClick={onClose}
        userData={{ clickable: true }}
      >
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        <meshBasicMaterial color="red" />
      </mesh>

      <Text
        position={[1.1, 0.8, 0.08]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ×
      </Text>
    </group>
  );
}
