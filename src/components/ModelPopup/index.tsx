// components/ModelPopup.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';

interface Props {
  open: boolean;
  onClose: () => void;
  modelUrl: string;
}

const ModelPopup = ({ open, onClose, modelUrl }: Props) => {
  if (!modelUrl){
    return null; // ⛔ Không render nếu chưa có model
  } else{
    console.log(modelUrl)
  }

  const gltf = useLoader(GLTFLoader, modelUrl);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Xem chi tiết</DialogTitle>
      <DialogContent>
        <div style={{ height: "400px" }}>
          <Canvas>
            <ambientLight />
            <primitive object={gltf.scene.clone()} scale={2} />
            <OrbitControls />
          </Canvas>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModelPopup;
