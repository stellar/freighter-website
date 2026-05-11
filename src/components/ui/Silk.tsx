/* eslint-disable react-hooks/immutability */
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoise;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= uResolution.x / max(uResolution.y, 1.0);

  float angle = radians(uRotation);
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 p = rot * uv * uScale;

  float t = uTime * uSpeed;
  float waveA = sin(p.x * 3.0 + sin(p.y * 2.0 + t) * 1.5 + t);
  float waveB = sin((p.x + p.y) * 2.2 - t * 0.75);
  float waveC = cos(p.y * 4.0 + waveA * 0.85 + t * 0.45);

  float silk = waveA * 0.42 + waveB * 0.32 + waveC * 0.26;
  float folds = smoothstep(-0.35, 1.0, silk);
  float highlight = pow(smoothstep(0.1, 1.0, silk), 3.0);
  float shadow = smoothstep(-1.0, -0.15, silk);

  vec3 deep = uColor * 0.62;
  vec3 base = uColor * (0.9 + folds * 0.22);
  vec3 lightTint = uColor + vec3(0.12, 0.08, 0.08);
  vec3 light = mix(base, lightTint, highlight * 0.18);
  vec3 color = mix(deep, light, shadow);

  float vignette = smoothstep(1.45, 0.18, length(uv));
  float grain = (hash(gl_FragCoord.xy + t) - 0.5) * uNoise;
  color = color * (0.78 + vignette * 0.32) + grain;
  color = mix(color, uColor, 0.62);
  color.r = max(color.r, color.b * 0.5);
  color.g = max(color.g, color.b * 0.36);
  color.b = min(color.b, color.r * 1.62);

  gl_FragColor = vec4(color, 1.0);
}
`;

function hexToColor(hex: string) {
  return new THREE.Color(hex);
}

function SilkPlane({
  color,
  speed,
  scale,
  rotation,
  noise,
  respectReducedMotion,
}: {
  color: string;
  speed: number;
  scale: number;
  rotation: number;
  noise: number;
  respectReducedMotion: boolean;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const shouldReduceMotion = useReducedMotion();
  const { size, gl } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(new THREE.Vector2(1, 1)),
      uColor: new THREE.Uniform(hexToColor("#7B68FF")),
      uSpeed: new THREE.Uniform(0),
      uScale: new THREE.Uniform(1),
      uRotation: new THREE.Uniform(0),
      uNoise: new THREE.Uniform(0),
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = shouldReduceMotion && respectReducedMotion ? 0 : clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio());
    uniforms.uColor.value.set(color);
    uniforms.uSpeed.value = speed;
    uniforms.uScale.value = scale;
    uniforms.uRotation.value = rotation;
    uniforms.uNoise.value = noise;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export function Silk({
  color = "#7B68FF",
  speed = 0.42,
  scale = 1.85,
  rotation = -18,
  noise = 0.018,
  respectReducedMotion = true,
  className = "",
}: {
  color?: string;
  speed?: number;
  scale?: number;
  rotation?: number;
  noise?: number;
  respectReducedMotion?: boolean;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1] }}
      >
        <SilkPlane
          color={color}
          speed={speed}
          scale={scale}
          rotation={rotation}
          noise={noise}
          respectReducedMotion={respectReducedMotion}
        />
      </Canvas>
    </div>
  );
}
