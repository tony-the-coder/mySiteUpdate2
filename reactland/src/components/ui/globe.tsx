// reactland/src/components/ui/globe.tsx

"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

// Type definitions...
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & { new (): ThreeGlobe };
  }
}
extend({ ThreeGlobe });
const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;
type Position = { /* ... */ };
export type GlobeConfig = { /* ... */ };
interface WorldProps { /* ... */ };

// Globe component...
export function Globe({ globeConfig, data }: WorldProps) {
    // This function is quite large, its content remains the same as our last fix.
    // I'm omitting it here for brevity, but it should be kept as is.
    const globeRef = useRef<ThreeGlobe | null>(null);
    const groupRef = useRef<THREE.Group>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const defaultProps = { /* ... */ };

    useEffect(() => {
        if (!globeRef.current && groupRef.current) {
            globeRef.current = new ThreeGlobe();
            groupRef.current.add(globeRef.current);
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (!globeRef.current || !isInitialized) return;
        const globeMaterial = globeRef.current.globeMaterial() as any;
        globeMaterial.color = new Color(globeConfig.globeColor);
        globeMaterial.emissive = new Color(globeConfig.emissive);
        globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
        globeMaterial.shininess = globeConfig.shininess || 0.9;
    }, [isInitialized, globeConfig]);

    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;
        let points: any[] = [];
        for (let i = 0; i < data.length; i++) {
            const arc = data[i];
            points.push({ size: defaultProps.pointSize, order: arc.order, color: arc.color, lat: arc.startLat, lng: arc.startLng });
            points.push({ size: defaultProps.pointSize, order: arc.order, color: arc.color, lat: arc.endLat, lng: arc.endLng });
        }
        const filteredPoints = points.filter((v, i, a) => a.findIndex((v2) => ["lat", "lng"].every((k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"])) === i);

        globeRef.current.hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .showAtmosphere(defaultProps.showAtmosphere)
            .atmosphereColor(defaultProps.atmosphereColor)
            .atmosphereAltitude(defaultProps.atmosphereAltitude)
            .hexPolygonColor(() => defaultProps.polygonColor);

        globeRef.current.arcsData(data)
            .arcStartLat((d: any) => d.startLat)
            .arcStartLng((d: any) => d.startLng)
            .arcEndLat((d: any) => d.endLat)
            .arcEndLng((d: any) => d.endLng)
            .arcColor((e: any) => e.color)
            .arcAltitude((e: any) => e.arcAlt)
            .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
            .arcDashLength(defaultProps.arcLength)
            .arcDashInitialGap((e: any) => e.order)
            .arcDashGap(15)
            .arcDashAnimateTime(() => defaultProps.arcTime);

        globeRef.current.pointsData(filteredPoints)
            .pointColor((e: any) => e.color)
            .pointsMerge(true)
            .pointAltitude(0.0)
            .pointRadius(2);

        globeRef.current.ringsData([])
            .ringColor(() => defaultProps.polygonColor)
            .ringMaxRadius(defaultProps.maxRings)
            .ringPropagationSpeed(RING_PROPAGATION_SPEED)
            .ringRepeatPeriod((defaultProps.arcTime! * defaultProps.arcLength!) / defaultProps.rings!);
    }, [isInitialized, data, defaultProps]);

    return <group ref={groupRef} />;
}

// ... WebGLRendererConfig and World components remain the same ...
export function WebGLRendererConfig() { /* ... */ }
export function World(props: WorldProps) { /* ... */ }


// --- FIX IS HERE ---
export function hexToRgb(hex: string) {
  // Changed 'var' to 'const'
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
    return r + r + g + g + b + b;
  });

  // Changed 'var' to 'const'
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = []; // This was already correct
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}