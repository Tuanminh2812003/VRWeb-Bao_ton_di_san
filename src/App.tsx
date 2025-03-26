import { Canvas } from "@react-three/fiber";
import { Environment, Gltf, PerspectiveCamera } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import { GlobalProvider } from "./context/global-context";
import { PlayerController } from "./components/playerRig"; // đường dẫn đúng

// Tạo XR store
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
          <PerspectiveCamera makeDefault position={[30, 1.6, 2]} fov={75} />
          <Environment preset="warehouse" />
          <Gltf src="/a_map_main_fix.glb" />
          <XR store={xrStore}>
            <PlayerController />
          </XR>
        </Canvas>

        <div
          style={{
            position: "fixed",
            display: "flex",
            width: "100vw",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <button
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "20px",
            }}
            onClick={() => {
              xrStore.enterVR();
            }}
          >
            Enter VR
          </button>
        </div>
      </>
    </GlobalProvider>
  );
}
