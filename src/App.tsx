import { Canvas } from "@react-three/fiber";
import { Gltf } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import { GlobalProvider } from "./context/global-context";
import { Locomotion } from "./components/Locomotion"; // 👈 đường dẫn đến file mới

export const xrStore = createXRStore({});

export default function App() {
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
            <Locomotion />
            <Gltf src="/a_map_main_fix.glb" />
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
