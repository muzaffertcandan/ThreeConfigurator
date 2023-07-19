import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { state } from "./store";

import {
  Center,
  useGLTF,
  Decal,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  useTexture
} from "@react-three/drei";

export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (
  <Canvas
    shadows
    gl={{preserveDrawingBuffer: true}}
    eventSource={document.getElementById("root")}
    eventPrefix="client"
    camera={{ position, fov }}
  >
    <ambientLight intensity={0.5} />
    <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
    <CameraRig>
      <BackDrop />
      <Center>
        <Shirt />
      </Center>
    </CameraRig>
  </Canvas>
);

function Shirt(props) {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");

  const texture = useTexture(`/${snap.selectedDecal}.png`)

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.selectedColor, 0.25, delta);
  });

  return (
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        {...props}
        position={[0.419, 5, 0]}
      >
      <Decal
      position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.18}
        opacity={0.8}
        map={texture}
        map-anisotropy={16}
      />
      </mesh>
  );
}

function BackDrop() {
  const shadows = useRef();
  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.selectedColor,
      0.25,
      delta
    )
  );

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60} // kaç frame de yüklendiği
      alphaTest={0.55} //alfa testi(opaklık bu değerden küçükse test çalışmaz)
      scale={10} //gölgenin ne kadar yayıldığı
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]} //gölge konumu
    >
      <RandomizedLight
        amount={4}
        radius={10}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -7]}
      />
      <RandomizedLight
        amount={4}
        radius={5} //ışık keskinliği
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }) {
  const group = useRef();
  useFrame((state, delta) => {
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

useGLTF.preload("/shirt_baked_collapsed.glb");
['/react.png', '/three2.png', '/pmndrs.png', '/exar.png'].forEach(useTexture.preload)
