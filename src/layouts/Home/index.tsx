import { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { GlobalProvider } from "../../context/global-context";
import { Locomotion } from "../../components/Locomotion";
import ModelLoader from "../../components/ModelLoader";

export const xrStore = createXRStore({});

type ModelConfig = {
  path: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  clickable: boolean;
};

export default function HomeXR() {
  const modelsConfig: ModelConfig[] = useMemo(
    () => [
      {
        path: "/a_map_main_fix.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
      },
      {
        path: "/anh_chuong_1.glb",
        position: [26.31, 2.9, 0],
        rotation: [0, 180, 0],
        scale: [1, 1, 1],
        clickable: false,
      },
    ],
    []
  );

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (loadedCount === modelsConfig.length) {
      setIsLoaded(true);
    }
  }, [loadedCount, modelsConfig.length]);

  useEffect(() => {
    if (isLoaded && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay bị chặn bởi trình duyệt:", error);
        });
      }
    }
  }, [isLoaded]);

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
              {modelsConfig.map((modelProps, index) => (
                <ModelLoader
                  key={index}
                  {...modelProps}
                  onLoad={() => setLoadedCount((prev) => prev + 1)}
                />
              ))}
            </Suspense>
          </XR>
        </Canvas>

        <audio
          ref={audioRef}
          src="/kgchinh.mp3"
          loop
          autoPlay
          style={{ display: "none" }}
        />

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
