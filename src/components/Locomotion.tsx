import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useXRInputSourceState, XROrigin } from "@react-three/xr";
import * as THREE from "three";

export function Locomotion() {
  const controller = useXRInputSourceState("controller", "right");
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree(); // 👈 lấy camera để dùng quaternion

  useFrame((_, delta) => {
    if (!ref.current || !controller?.gamepad) return;

    const thumbstick = controller.gamepad["xr-standard-thumbstick"];
    if (!thumbstick) return;

    const speed = 2.5;
    const moveX = (thumbstick.xAxis ?? 0) * delta * speed;
    const moveZ = -(thumbstick.yAxis ?? 0) * delta * speed

    // 👉 Lấy hướng nhìn từ camera
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion); // 👈 dùng hướng nhìn của người dùng
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0));
    const moveVector = new THREE.Vector3();

    moveVector.addScaledVector(direction, moveZ);
    moveVector.addScaledVector(right, moveX);

    ref.current.position.add(moveVector);
  });

  return <XROrigin ref={ref} />;
}
