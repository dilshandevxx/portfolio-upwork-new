"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useFBO, OrthographicCamera, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useEffect, useState } from "react";

// -----------------------------------------------------------------------------
// Shaders
// -----------------------------------------------------------------------------

const simulationVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const simulationFragmentShader = `
uniform sampler2D uCurrentState;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uAspect; // Aspect ratio (width / height)
uniform float uForce;
uniform float uRadius;
uniform bool uClicked;
uniform float uViscosity;

varying vec2 vUv;

void main() {
    vec2 cellSize = 1.0 / uResolution;
    vec2 uv = vUv;

    // Sample neighbors
    float up = texture2D(uCurrentState, uv + vec2(0.0, cellSize.y)).r;
    float down = texture2D(uCurrentState, uv - vec2(0.0, cellSize.y)).r;
    float left = texture2D(uCurrentState, uv - vec2(cellSize.x, 0.0)).r;
    float right = texture2D(uCurrentState, uv + vec2(cellSize.x, 0.0)).r;
    
    vec4 state = texture2D(uCurrentState, uv);
    float height = state.r;
    float vel = state.g;
    
    float avg = (up + down + left + right) / 4.0;
    
    // Wave equation
    float force = avg - height;
    
    vel += force * 0.5;
    vel *= uViscosity;
    height += vel;
    
    // Mouse Interaction
    // Correct distance for aspect ratio
    vec2 aspectCorrection = vec2(uAspect, 1.0);
    vec2 uvCorrected = uv * aspectCorrection;
    vec2 mouseCorrected = uMouse * aspectCorrection;
    
    float dist = distance(uvCorrected, mouseCorrected);

    if (uClicked && dist < uRadius) {
        float ripple = uForce * (1.0 - smoothstep(0.0, uRadius, dist));
        height -= ripple;
    }

    gl_FragColor = vec4(height, vel, 0.0, 1.0);
}
`;

const renderVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const renderFragmentShader = `
uniform sampler2D uTexture;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;

void main() {
    float height = texture2D(uTexture, vUv).r;
    
    // Calculate normals for lighting/refraction
    vec2 size = vec2(1.0/512.0, 0.0); // Epsilon
    float hRight = texture2D(uTexture, vUv + size.xy).r;
    float hTop = texture2D(uTexture, vUv + size.yx).r;
    
    vec3 normal = normalize(vec3(height - hRight, height - hTop, 0.05));
    
    // Lighting
    vec3 lightDir = normalize(vec3(-1.0, 1.0, 1.0));
    float diffuse = max(dot(normal, lightDir), 0.0);
    float specular = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0)), 0.0), 20.0);
    
    // Base gradient
    vec3 col = mix(uColor1, uColor2, vUv.y);
    
    // Chromatic Aberration / Refraction
    // Offset RGB channels based on normal
    float aberrationStrength = 0.02;
    vec3 refraction = vec3(0.0);
    // Since we are creating the color here, we simulate it by tweaking lighting or mixing
    // But better: Use the normal to slightly shift the gradient lookup or background if we had one.
    // Here we just shift the lighting components slightly.
    
    // Fake CA by shifting the specular highlight
    float specularR = pow(max(dot(reflect(-lightDir, normal + vec3(0.005, 0.0, 0.0)), vec3(0.0, 0.0, 1.0)), 0.0), 20.0);
    float specularB = pow(max(dot(reflect(-lightDir, normal - vec3(0.005, 0.0, 0.0)), vec3(0.0, 0.0, 1.0)), 0.0), 20.0);
    
    vec3 specColor = vec3(specularR, specular, specularB);

    col += (diffuse * 0.1) + (specColor * 0.8) * 0.5;

    gl_FragColor = vec4(col, 1.0);
}
`;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Simulation = () => {
  const { size, pointer, viewport } = useThree();
  
  // Simulation Render Targets
  const simRes = 256; // Increased from 128 for smoother ripples
  const sceneState = useFBO(simRes, simRes, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGFormat,
    type: THREE.FloatType,
  });
  const sceneStatePrev = useFBO(simRes, simRes, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGFormat,
    type: THREE.FloatType,
  });

  // Materials
  const simMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uCurrentState: { value: null },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(simRes, simRes) },
        uAspect: { value: 1.0 },
        uForce: { value: 0.2 }, // Bumped up slightly for visibility
        uRadius: { value: 0.025 },
        uViscosity: { value: 0.97 }, // Decreased slightly (faster ripples) to make movement more obvious
        uClicked: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });
  }, []);

  const renderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uColor1: { value: new THREE.Color("#020410") }, // Deep Blue/Black
        uColor2: { value: new THREE.Color("#0f172a") }, // Dark Slate Blue tint
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
    });
  }, []);

  // Ping-pong Ref
  const frameRef = useRef(0);
  const targetA = useRef(sceneState);
  const targetB = useRef(sceneStatePrev);

  useFrame((state) => {
    const { gl, pointer, size } = state;

    // 1. Simulation Pass
    const currentTarget = frameRef.current % 2 === 0 ? targetA.current : targetB.current;
    const prevTarget = frameRef.current % 2 === 0 ? targetB.current : targetA.current;
    
    // Aspect Ratio
    const aspect = size.width / size.height;
    
    // Convert pointer (-1 to 1) to UV (0 to 1)
    const uvX = (pointer.x + 1) / 2;
    const uvY = (pointer.y + 1) / 2;
    
    simMaterial.uniforms.uCurrentState.value = prevTarget.texture;
    simMaterial.uniforms.uMouse.value.set(uvX, uvY);
    simMaterial.uniforms.uAspect.value = aspect;
    simMaterial.uniforms.uClicked.value = 1;
    
    gl.setRenderTarget(currentTarget);
    gl.render(sceneMesh, dummyCamera);
    gl.setRenderTarget(null);

    // 2. Render Pass
    renderMaterial.uniforms.uTexture.value = currentTarget.texture;
    
    frameRef.current++;
  });

  // Dummy scene for simulation
  const dummyCamera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);
  const sceneMesh = useMemo(() => {
    const geom = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geom, simMaterial);
    const scene = new THREE.Scene();
    scene.add(mesh);
    return scene;
  }, [simMaterial]);

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <primitive object={renderMaterial} attach="material" />
    </mesh>
  );
};

export default function LiquidBackground() {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>();
  
  useEffect(() => {
    if (typeof document !== 'undefined') {
        setEventSource(document.body);
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-black">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 1] }}
        eventSource={eventSource} // Bind mouse events to body so they work over text
        style={{ pointerEvents: 'none' }} // Canvas itself shouldn't capture clicks, just listen
      >
        <Simulation />
      </Canvas>
    </div>
  );
}
