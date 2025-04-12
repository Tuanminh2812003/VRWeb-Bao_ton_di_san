// pages/HomeXR.tsx
import { useState, useMemo, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore, useXRInputSourceState } from "@react-three/xr";
import PictureModel from "../../components/PictureModel";
import VRPopup from "../../components/VRPopup";
import { Locomotion } from "../../components/Locomotion";
import { useFrame } from "@react-three/fiber";

export const xrStore = createXRStore({});

export default function HomeXR() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupPosition, setPopupPosition] = useState<[number, number, number]>([0, 2, -3]);

  const models = useMemo(
    () => [
      {
        path: "/a_map_main_fix.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/img_01.glb",
        position: [-5.97, 2.3, -0.7],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/img_01.glb",
        position: [0, 2.3, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
    ],
    []
  );

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (loadedCount === models.length) setIsLoaded(true);
  }, [loadedCount]);

  return (
    <>
      <Canvas style={{ width: "100vw", height: "100vh", position: "fixed" }}>
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
              onClick={({ position, lookAt }) => {
                setPopupVisible(true);
                setPopupContent(m.info || "Không có thông tin.");
                setPopupPosition([position.x, position.y, position.z]);
                console.log(lookAt);
              }}
              onLoad={() => setLoadedCount((prev) => prev + 1)}
            />
            ))}
          </Suspense>
          <VRPopup
            visible={popupVisible}
            content={popupContent}
            position={popupPosition}
            onClose={() => setPopupVisible(false)}
          />
          {isLoaded && <Locomotion />}
          <TogglePopupButton onToggle={() => setPopupVisible((prev) => !prev)} />
        </XR>
      </Canvas>
    </>
  );
}

// Nút bật/tắt popup bằng tay cầm (bấm trigger phải)
function TogglePopupButton({ onToggle }: { onToggle: () => void }) {
  const rightHand = useXRInputSourceState("controller", "right");

  useFrame(() => {
    const gamepad = rightHand?.gamepad as Gamepad | undefined;
    if (gamepad?.buttons?.[0]?.pressed) {
      onToggle();
    }
  });

  return null;
}