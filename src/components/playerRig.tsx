import { useXR } from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function PlayerController() {
  const controllers = (useXR() as any).controllers;
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const controller = controllers?.[0];
    if (!controller?.inputSource?.gamepad || !groupRef.current) return;

    const [xAxis, yAxis] = controller.inputSource.gamepad.axes.slice(2, 4);
    console.log("Joystick:", { xAxis, yAxis }); // 👈 thêm dòng này
    const speed = 0.05;

    const direction = new THREE.Vector3();
    groupRef.current.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0));
    const moveVector = new THREE.Vector3();
    moveVector.addScaledVector(direction, yAxis * speed);
    moveVector.addScaledVector(right, xAxis * speed);

    groupRef.current.position.add(moveVector);
  });

  return <group ref={groupRef} />;
}
