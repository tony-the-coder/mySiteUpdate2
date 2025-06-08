// reactland/src/components/ui/globe.tsx (Final Version)

"use client";
import {Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

// --- FIX for TS2339 ---
// This declaration tells TypeScript about the custom <threeGlobe> element.
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: any;
  }
}

// Make ThreeGlobe available to the R3F renderer
extend({ ThreeGlobe });

// Type definitions for props
type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

// This is the internal component that renders the globe itself
function GlobeInternal({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);

  useEffect(() => {
    if (globeRef.current) {
      const globeMaterial = globeRef.current.globeMaterial() as THREE.MeshPhongMaterial;
      globeMaterial.color = new THREE.Color(globeConfig.globeColor);
      globeMaterial.emissive = new THREE.Color(globeConfig.emissive);
      globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
      globeMaterial.shininess = globeConfig.shininess || 0.9;

      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .hexPolygonColor(() => globeConfig.polygonColor || "");

      // --- FIX for TS2345 ---
      // We provide a default value using `??` in case the prop is undefined.
      globeRef.current
        .arcsData(data)
        .arcColor((e: any) => e.color)
        .arcAltitude((e: any) => e.arcAlt)
        .arcDashLength(globeConfig.arcLength ?? 0.9)
        .arcDashGap(15)
        .arcDashAnimateTime(() => globeConfig.arcTime ?? 1000);
    }
  }, [globeConfig, data]);

  return <threeGlobe ref={globeRef} />;
}

// Main exported component that sets up the 3D scene
export function World({ globeConfig, data }: WorldProps) {
  const { gl } = useThree();
  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
  }, [gl]);

  return (
    <>
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight color={globeConfig.directionalLeftLight} position={new THREE.Vector3(-400, 100, 400)} />
      <directionalLight color={globeConfig.directionalTopLight} position={new THREE.Vector3(-200, 500, 200)} />
      <pointLight color={globeConfig.pointLight} position={new THREE.Vector3(-200, 500, 200)} intensity={0.8} />
      <GlobeInternal globeConfig={globeConfig} data={data} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={300}
        maxDistance={300}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </>
  );
}

// The Canvas wrapper has been moved to the component that USES the Globe (GlobeDemo.tsx)
// To provide Suspense, which is best practice.
export default function WorldCanvasWrapper(props: WorldProps) {
    return (
        <Canvas>
            <Suspense fallback={null}>
                <World {...props} />
            </Suspense>
        </Canvas>
    );
}