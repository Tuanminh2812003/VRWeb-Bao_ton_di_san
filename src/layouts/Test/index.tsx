import { useState, useMemo, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { Vector3 } from "three";
import { Locomotion } from "../../components/Locomotion";
import PictureModel from "../../components/PictureModel";
import ModelPopup from "../../components/ModelPopup";

export const xrStore = createXRStore({});

export default function HomeXR() {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const models = useMemo(
    () => [
      {
        path: "/a_map_main_fix.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
      },
      {
        path: "/img_01.glb",
        position: [-5.97, 2.3, -0.7],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
      },
    ],
    []
  );

  const [targetPos, setTargetPos] = useState<Vector3 | null>(null);
  const [lookAt, setLookAt] = useState<Vector3 | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedModelUrl, setSelectedModelUrl] = useState("");

  const handleModelClick = ({ position, lookAt }: { position: Vector3; lookAt: Vector3 }) => {
    setTargetPos(position);
    setLookAt(lookAt);
    setPopupOpen(true);
  };

  useEffect(() => {
    if (loadedCount === models.length) {
      setIsLoaded(true);
    }
  }, [loadedCount]);

  return (
    <>
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
        }}
      >
        <XR store={xrStore}>
          <ambientLight />
          <Suspense fallback={null}>
            {models.map((m, i) => (
              <PictureModel
                key={i}
                path={m.path}
                position={m.position as [number, number, number]}
                rotation={m.rotation as [number, number, number]}
                scale={m.scale as [number, number, number]}
                clickable={m.clickable}
                onClick={(data) => {
                  handleModelClick(data);
                  setSelectedModelUrl(m.path);
                }}
                onLoad={() => setLoadedCount((prev) => prev + 1)}
              />
            ))}
          </Suspense>
          {isLoaded && <Locomotion />}
        </XR>
      </Canvas>

      <ModelPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        modelUrl={selectedModelUrl}
      />

      <button
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
        onClick={() => xrStore.enterVR()}
      >
        Enter VR
      </button>
    </>
  );
}
