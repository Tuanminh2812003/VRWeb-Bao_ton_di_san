import React, { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

interface PictureModelProps {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  onClick?: (data: { position: THREE.Vector3; lookAt: THREE.Vector3 }) => void;
  onLoad?: () => void;
  clickable?: boolean;
}

export default function PictureModel({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  clickable = true,
  onClick,
  onLoad,
}: PictureModelProps) {
  const gltf = useLoader(GLTFLoader, path);
  const model = useMemo(() => gltf.scene.clone(true), [gltf]);

  useEffect(() => {
    model.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (clickable) {
          child.userData.clickable = true; // 🔥 cần thiết cho raycaster của XR
        }
      }
    });

    if (onLoad) onLoad();
  }, [model]);

  const handleClick = () => {
    if (!onClick) return;

    const pos = new THREE.Vector3(...position);
    const direction = new THREE.Vector3(0, 0, 1).applyEuler(
      new THREE.Euler(...rotation.map((r) => r * (Math.PI / 180)) as [number, number, number])
    );
    const cameraPos = pos.clone().add(direction.multiplyScalar(4));

    onClick({ position: cameraPos, lookAt: pos });
  };

  return (
    <group
      position={position}
      rotation={rotation.map((r) => r * (Math.PI / 180)) as [number, number, number]}
      scale={scale}
      onClick={clickable ? handleClick : undefined} // ✨ CHỈ GÁN NẾU CHO PHÉP CLICK
    >
      <primitive object={model} />
    </group>
  );
}
