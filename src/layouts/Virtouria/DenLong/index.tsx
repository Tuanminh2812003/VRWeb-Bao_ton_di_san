// pages/HomeXR.tsx
import { useState, useMemo, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore, useXRInputSourceState } from "@react-three/xr";
import PictureModel from "../../../components/PictureModel";
import VRPopup from "../../../components/VRPopup";
import { Locomotion } from "../../../components/Locomotion";
import { GrabHandler } from "../../../components/GrabHandler";
import { useFrame } from "@react-three/fiber";

export const xrStore = createXRStore({});

export default function HomeXR() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupPosition, setPopupPosition] = useState<[number, number, number]>([0, 2, -3]);

  const models = useMemo(
    () => [
      {
        path: "/Virtouria/DenLong/Bonsai.glb",
        position: [0, 0, 0],
        rotation: [0, 180, 0],
        scale: [1, 1, 1],
        clickable: false,
        grabbable: true, 
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
        lookAtNum: [1,-1,0],
      },
      // {
      //   path: "/Virtouria/DenLong/Firebug.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: false,
      //   lookAtNum: [1,-1,0],
      //   info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      // },
      // {
      //   path: "/Virtouria/DenLong/Hanging latern.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: true,
      //   info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
      //   lookAtNum: [1,-1,0],
      //   imageInfo: "/Image/27.jpg",
      // },
      // {
      //   path: "/Virtouria/DenLong/Moutain.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: true,
      //   info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
      //   lookAtNum: [1,-1,0],
      //   imageInfo: "/Image/27.jpg",
      // },
      // {
      //   path: "/Virtouria/DenLong/Moutain.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: true,
      //   info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
      //   lookAtNum: [1,-1,0],
      //   imageInfo: "/Image/27.jpg",
      // },
      // {
      //   path: "/Virtouria/DenLong/Paper.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: true,
      //   info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
      //   lookAtNum: [1,-1,0],
      //   imageInfo: "/Image/27.jpg",
      // },
      // {
      //   path: "/Virtouria/DenLong/Sky Lantern.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: true,
      //   info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
      //   lookAtNum: [1,-1,0],
      //   imageInfo: "/Image/27.jpg",
      // },
      // {
      //   path: "/Virtouria/DenLong/Sky.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: true,
      //   info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
      //   lookAtNum: [1,-1,0],
      //   imageInfo: "/Image/27.jpg",
      // },
      // {
      //   path: "/Virtouria/DenLong/Space.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: true,
      //   info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
      //   lookAtNum: [1,-1,0],
      //   imageInfo: "/Image/27.jpg",
      // },
      // {
      //   path: "/Virtouria/DenLong/Steel bending.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: true,
      //   info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
      //   lookAtNum: [1,-1,0],
      //   imageInfo: "/Image/27.jpg",
      // },
      // {
      //   path: "/Virtouria/DenLong/Stock.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: true,
      //   info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
      //   lookAtNum: [1,-1,0],
      //   imageInfo: "/Image/27.jpg",
      // },
      // {
      //   path: "/Virtouria/DenLong/Table.glb",
      //   position: [0, -1.6, 0],
      //   rotation: [0, 0, 0],
      //   scale: [1, 1, 1],
      //   clickable: true,
      //   info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
      //   lookAtNum: [1,-1,0],
      //   imageInfo: "/Image/27.jpg",
      // },
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
          <ambientLight intensity={3} />
          <Suspense fallback={null}>
            {models.map((m, i) => (
              <PictureModel
              key={i}
              path={m.path}
              position={m.position as [number, number, number]}
              rotation={m.rotation as [number, number, number]}
              scale={m.scale as [number, number, number]}
              clickable={m.clickable}
              grabbable={m.grabbable}
              onClick={({ position, lookAt }) => {
                setPopupVisible(true);
                setPopupContent(m.info || "Không có thông tin.");

                console.log(position);
              
                // Mặc định nếu không có lookAtNum thì không cộng thêm gì cả
                const offset = m.lookAtNum ?? [0, 0, 0];
              
                setPopupPosition([
                  lookAt.x + offset[0],
                  lookAt.y + offset[1],
                  lookAt.z + offset[2],
                ]);
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
          <GrabHandler />
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