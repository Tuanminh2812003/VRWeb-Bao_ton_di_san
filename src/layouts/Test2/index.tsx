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
        path: "anh_chuong_1.glb",
        position: [26.3, 2.9, 0],
        rotation: [0, 180, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "a_map_main_fix.glb",
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
        info: "LỄ HỘI KHMER Ở CÀ MAU - Lại Lâm Tùng",
        lookAtNum: [1,-1,0],
        imageInfo: "/Image/27.jpg",
      },
      {
        path: "/img_02.glb",
        position: [-5.93372, 2.15649, -4.70689],
        rotation: [0, -15, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "NGHÌN XƯA LƯU DẤU - Lê Thị Thanh",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_03.glb",
        position: [-5.64392, 1.84545, 3.11312],
        rotation: [0, 12, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "HIẾU LĂNG MỘT CHIỀU THU - Trần Thị Thanh Dung",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_04.glb",
        position: [-4.62278, 1.85073, 5.63254],
                        rotation: [0, 24, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "CHÙA HANG ĐẢO LÝ SƠN - Lê Phi Hùng",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_05.glb",
        position: [10.0221, 2.66196, 15.675],
                        rotation: [0, 90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "TIÊN NỮ - CÁNH DIỀU VÀ MÁI ĐÌNH - Phạm Hùng Anh",
        lookAtNum: [0,-1,-1]
      },
      {
        path: "/img_06.glb",
        position: [6.56459, 2.66196, 15.675],
                        rotation: [0, 90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "MÚA RỒNG - Dương Hồng Hạnh",
        lookAtNum: [0,-1,-1]
      },
      {
        path: "/img_07.glb",
        position: [3.10709, 2.66196, 15.675],
                        rotation: [0, 90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "LỄ HỘI LAM KINH - Vũ Trọng Thành",
        lookAtNum: [0,-1,-1]
      },
      {
        path: "/img_08.glb",
        position: [-0.35041, 2.66196, 15.675],
                        rotation: [0, 90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "TRỞ VỀ - Nguyễn Tiến Việt",
        lookAtNum: [0,-1,-1]
      },
      {
        path: "/img_09.glb",
        position: [-3.80791, 2.66196, 15.675],
                        rotation: [0, 90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "HỒN CHÉ - Y Luê Adrơng",
        lookAtNum: [0,-1,-1]
      },
      {
        path: "/img_10.glb",
        position: [-7.26541, 2.66196, 15.675],
                        rotation: [0, 90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "RƯỚC KIỆU - Phạm Ngọc Linh",
        lookAtNum: [0,-1,-1]
      },
      {
        path: "/img_11.glb",
        position: [-10.72291, 2.66196, 15.675],
                        rotation: [0, 90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "BÀ CHÚA - Phạm Tuấn Anh",
        lookAtNum: [0,-1,-1]
      },
      {
        path: "/img_12.glb",
        position: [-14.18041, 2.66196, 15.675],
        rotation: [0, 90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "KHÔNG GIAN CỒNG CHIÊNG TÂY NGUYÊN - Phạm Thế Bộ",
        lookAtNum: [0,-1,-1]
      },
      {
        path: "/img_13.glb",
        position: [-17.63791, 2.66196, 15.675],
                        rotation: [0, 90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "TUỒNG - Văn Minh Chìu",
        lookAtNum: [0,-1,-1]
      },
      {
        path: "/img_14.glb",
        position: [-22.5231, 2.6673, 12.06],
                        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "SỢI VÀNG - Tử Mộc Trà (Phạm Thùy Dương)",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_15.glb",
        position: [-22.5231, 2.6673, 8.60245],
                        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "LÊN ĐÈN - Phạm Tuấn Dương",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_16.glb",
        position: [-22.5231, 2.6673, 5.14495],
                        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "VÀNG SON MỘT THUỞ - Nguyễn Thị Lam",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_17.glb",
        position: [-22.5231, 2.6673, 1.68745],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "TRẠI BẢO AN BINH - Trần Nam Long",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_18.glb",
        position: [-22.5231, 2.6673, -1.77005],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "RỐI NƯỚC - Mai Ngọc Minh",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_19.glb",
        position: [-22.5231, 2.6673, -5.22755],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "NÉT ĐẸP VÙNG CAO - Trần Giang Nam",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_20.glb",
        position: [-22.5231, 2.6673, -8.68505],
                        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "TRUYỀN THUYẾT LẠC LONG QUÂN - ÂU CƠ - Hùng Khuynh (Phạm Mạnh Hùng)",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_21.glb",
        position: [-22.5231, 2.6673, -12.14255],
                        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "TIẾN SĨ GIẤY - Nguyễn Hiền Phương",
        lookAtNum: [1,-1,0]
      },
      {
        path: "/img_22.glb",
        position: [-17.6298, 2.6673, -15.683],
                        rotation: [0, -90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "LỄ HỘI CẦU NGƯ - Bùi Văn Quang",
        lookAtNum: [0,-1,1]
      },
      {
        path: "/img_23.glb",
        position: [-14.1723, 2.6673, -15.683],
                        rotation: [0, -90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: 'MIỀN KÝ ỨC - Lê Ngọc Thể',
        lookAtNum: [0,-1,1]
      },
      {
        path: "/img_24.glb",
        position: [-10.7148, 2.6673, -15.683],
                        rotation: [0, -90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "THÊU VÁY MÙA XUÂN' - Lương Đức Thịnh",
        lookAtNum: [0,-1,1]
      },
      {
        path: "/img_25.glb",
        position: [-7.2573, 2.6673, -15.683],
                        rotation: [0, -90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "HỘI CHỬ ĐỒNG TỬ - Lê Văn Thước",
        lookAtNum: [0,-1,1]
      },
      {
        path: "/img_26.glb",
        position: [-3.7998, 2.6673, -15.683],
                        rotation: [0, -90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "RỒNG - Phạm Xuân Trung",
        lookAtNum: [0,-1,1]
      },
      {
        path: "/img_27.glb",
        position: [-0.3423, 2.6673, -15.683],
        rotation: [0, -90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "HỒN VIỆT - Nguyễn Bá Tuấn",
        lookAtNum: [0,-1,1]
      },
      {
        path: "/img_28.glb",
        position: [3.1152, 2.6673, -15.683],
        rotation: [0, -90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "RỪNG QUỐC GIA CÚC PHƯƠNG - Đặng Khánh Tường",
        lookAtNum: [0,-1,1]
      },
      {
        path: "/img_29.glb",
        position: [6.5723, 2.6673, -15.683],
        rotation: [0, -90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "MÊNH MÔNG PHỐ HỘI - Nguyễn Ngọc Vinh",
        lookAtNum: [0,-1,1]
      },
      {
        path: "/img_30.glb",
        position: [10.0302, 2.6673, -15.683],
        rotation: [0, -90, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "HƯƠNG SẮC VÙNG CAO - Phạm Quang Vinh",
        lookAtNum: [0,-1,1]
      },
      {
        path: "/vietnam_footlockerchest.glb",
        position: [-3.5, 0.5, 8.5],
        rotation: [0, 120, 0],
        scale: [4, 4, 4],
        clickable: true,
        info: "Hộp quân dụng kim loại màu xanh rêu - quân đội Việt Nam để đựng vũ khí, đạn dược hoặc thiết bị chuyên dụng. Thiết kế chắc chắn với quai xách và khóa cài hai bên.",
        lookAtNum: [1,2,0]
      },
      {
        path: "/wooden_table.glb",
        position: [-3.5, 0.6, -7.5],
        rotation: [0, -60, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Hộp quân dụng kim loại màu xanh rêu - quân đội Việt Nam để đựng vũ khí, đạn dược hoặc thiết bị chuyên dụng. Thiết kế chắc chắn với quai xách và khóa cài hai bên.",
        lookAtNum: [1,2,0]
      },
      {
        path: "/mooncake_in_vietnam.glb",
        position: [-3.5, 1.2, -7.5],
        rotation: [0, -60, 0],
        scale: [0.001, 0.001, 0.001],
        clickable: true,
        info: "Bánh trung thu và hoa sen – Một khay gỗ bày bánh trung thu truyền thống cùng hoa sen hồng, biểu tượng cho sự đoàn viên, thanh cao trong văn hóa Việt. Đây là hình ảnh quen thuộc mỗi dịp Tết Trung thu.",
        lookAtNum: [1,2,0]
      },
      {
        path: "/vietnam_war_bottle.glb",
        position: [-3.6, 1.1, -7],
        rotation: [0, -60, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Bi đông quân đội – Bình nước bằng nhôm phủ vải kaki màu xanh rêu, thường dùng trong quân đội Việt Nam để đựng nước khi hành quân hoặc chiến đấu. Thiết kế nhỏ gọn, có nắp vặn và móc cài tiện lợi.",
        lookAtNum: [1,2,0]
      },
      {
        path: "/bread_vietnam.glb",
        position: [-5.5, 0, -3],
        rotation: [0, -60, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Giỏ bánh mì và nón lá – Hình ảnh quen thuộc trong đời sống thường nhật của người Việt. Bánh mì giòn vàng – món ăn đường phố phổ biến, kết hợp với chiếc nón lá mang đậm bản sắc văn hóa dân tộc, gợi nhớ đến hình ảnh những gánh hàng rong giản dị, mộc mạc.",
        lookAtNum: [1, 2,0]
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