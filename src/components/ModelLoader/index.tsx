import React, { useState, useEffect, memo } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

interface ModelLoaderProps {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  clickable?: boolean;
  onClick?: (
    position: [number, number, number],
    rotation: [number, number, number]
  ) => void;
  onLoad?: () => void;
}

const ModelLoader = memo(({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  clickable = false,
  onClick,
  onLoad
}: ModelLoaderProps) => {
  const gltf = useLoader(GLTFLoader, path);
  const [sceneClone] = useState(() => gltf.scene.clone(true));

  useEffect(() => {
    sceneClone.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.userData.clickable = clickable;

        if (clickable) {
          child.cursor = 'pointer';
          child.onClick = () => {
            if (onClick) {
              onClick(position, rotation);
            }
          };
        }
      }
    });

    if (onLoad) onLoad();
  }, [sceneClone]);

  return (
    <group
      position={position}
      rotation={rotation.map(r => r * (Math.PI / 180)) as [number, number, number]}
      scale={scale}
    >
      <primitive object={sceneClone} />
    </group>
  );
});

export default ModelLoader;
