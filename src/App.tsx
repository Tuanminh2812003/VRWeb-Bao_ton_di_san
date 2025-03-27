import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Gltf, useProgress } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import { GlobalProvider } from "./context/global-context";
import { Locomotion } from "./components/Locomotion";

export const xrStore = createXRStore({});

function GLTFScene({ onLoad }: { onLoad: () => void }) {
  const { progress } = useProgress();

  React.useEffect(() => {
    if (progress === 100) {
      onLoad();
    }
  }, [progress, onLoad]);

  return <Gltf src="/BaoTang_2_main_bake_clean_map.glb" />;
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <GlobalProvider>
      <>
        <Canvas
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
          }}
        >
          <color args={[0x808080]} attach="background" />
          <XR store={xrStore}>
            <ambientLight />
            {isLoaded && <Locomotion />}
            <Suspense fallback={null}>
              <GLTFScene onLoad={() => setIsLoaded(true)} />
            </Suspense>
          </XR>
        </Canvas>

        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            pointerEvents: "none",
          }}
        >
          <button
            style={{
              marginBottom: "20px",
              fontSize: "20px",
              pointerEvents: "auto",
            }}
            onClick={() => xrStore.enterVR()}
          >
            Enter VR
          </button>
        </div>
      </>
    </GlobalProvider>
  );
}
