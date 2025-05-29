import { useXR } from "@react-three/xr";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GrabHandler() {
  const controllers = (useXR() as any).controllers;
  const grabbed = useRef<THREE.Object3D | null>(null);

  useFrame(() => {
    const controller = controllers?.[0];
    if (!controller?.gripSpace || !controller?.inputSource?.gamepad) return;

    const grip = controller.gripSpace;

    // Nếu đang cầm object
    if (grabbed.current) {
      grabbed.current.position.copy(grip.position);
      grabbed.current.quaternion.copy(grip.quaternion);

      // Nhả object nếu buông trigger
      if (!controller.inputSource.gamepad.buttons?.[0]?.pressed) {
        grabbed.current = null;
      }
      return;
    }

    // Nếu đang nhấn trigger → tìm object gần để cầm
    if (controller.inputSource.gamepad.buttons?.[0]?.pressed) {
      grip.parent?.traverse((child: THREE.Object3D) => {
        if (
          child.userData?.grabbable &&
          child instanceof THREE.Object3D &&
          !grabbed.current
        ) {
          const distance = grip.position.distanceTo(child.position);
          if (distance < 0.3) {
            grabbed.current = child;
          }
        }
      });
    }
  });

  return null;
}
