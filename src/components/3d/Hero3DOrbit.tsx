import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";
import { AI_TOOLS_DATA } from "../../data/clubData";
import { AITool } from "../../types";
import { ExternalLink, BookOpen, Sparkles, ChevronRight, Play, Pause, RefreshCw } from "lucide-react";
import { useSound } from "../../context/SoundContext";

export const Hero3DOrbit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const { playHover, playClick } = useSound();

  const selectedTool: AITool = AI_TOOLS_DATA[selectedIndex];

  // Three.js Scene References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const orbitGroupRef = useRef<THREE.Group | null>(null);
  const nodeMeshesRef = useRef<THREE.Mesh[]>([]);
  const targetRotationYRef = useRef(0);
  const currentRotationYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const previousMouseXRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Ambient & Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Center Core Sphere
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner glowing core
    const innerCoreGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    scene.add(innerCoreMesh);

    // Orbiting Group
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    orbitGroupRef.current = orbitGroup;

    // Orbit Ring Wireframe
    const ringGeo = new THREE.TorusGeometry(6.5, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    orbitGroup.add(ringMesh);

    // Texture generator helper for 3D tool nodes
    const createToolCanvasTexture = (tool: AITool): THREE.CanvasTexture => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;

      if (ctx) {
        // Metallic dark glass background
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, "#1e1e24");
        grad.addColorStop(0.5, "#121216");
        grad.addColorStop(1, "#09090c");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // Accent brand glow border
        ctx.strokeStyle = tool.color || "#ffffff";
        ctx.lineWidth = 18;
        ctx.beginPath();
        ctx.roundRect(16, 16, 480, 480, 40);
        ctx.stroke();

        // Inner frame glow
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(32, 32, 448, 448, 30);
        ctx.stroke();

        // Tool Name & Category
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 48px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tool.name.toUpperCase(), 256, 405);

        ctx.fillStyle = tool.color || "#aaaaaa";
        ctx.font = "bold 26px monospace";
        ctx.fillText(`• ${tool.category} ENGINE •`, 256, 455);

        // Center circular logo frame
        ctx.fillStyle = "#08080a";
        ctx.beginPath();
        ctx.arc(256, 210, 115, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 6;
        ctx.stroke();

        // Load image logo onto canvas
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.drawImage(img, 166, 120, 180, 180);
          texture.needsUpdate = true;
        };
        img.onerror = () => {
          // Fallback initial
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 90px monospace";
          ctx.fillText(tool.name.substring(0, 2).toUpperCase(), 256, 210);
          texture.needsUpdate = true;
        };
        img.src = tool.logo;
      }

      return texture;
    };

    // Create 3D Nodes for AI Tools
    const numTools = AI_TOOLS_DATA.length;
    const radius = 6.5;
    const meshes: THREE.Mesh[] = [];

    AI_TOOLS_DATA.forEach((tool, i) => {
      const angle = (i / numTools) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Node Glass Frame
      const nodeGeo = new THREE.BoxGeometry(1.4, 1.4, 0.25);

      const canvasTexture = createToolCanvasTexture(tool);

      const nodeMat = [
        new THREE.MeshStandardMaterial({ color: 0x111115, metalness: 0.9 }),
        new THREE.MeshStandardMaterial({ color: 0x111115, metalness: 0.9 }),
        new THREE.MeshStandardMaterial({ color: 0x111115, metalness: 0.9 }),
        new THREE.MeshStandardMaterial({ color: 0x111115, metalness: 0.9 }),
        new THREE.MeshStandardMaterial({ map: canvasTexture, metalness: 0.2, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0x22222a, metalness: 0.9 }),
      ];

      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(x, 0, z);
      mesh.userData = { index: i, angle };

      orbitGroup.add(mesh);
      meshes.push(mesh);
    });

    nodeMeshesRef.current = meshes;

    // Window Resize Listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Drag Interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMouseXRef.current = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMouseXRef.current;
      targetRotationYRef.current += deltaX * 0.005;
      previousMouseXRef.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Render Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Rotate core mesh
      coreMesh.rotation.y = elapsedTime * 0.2;
      coreMesh.rotation.x = elapsedTime * 0.1;

      // Auto rotation if enabled and not dragging
      if (isAutoRotate && !isDraggingRef.current) {
        targetRotationYRef.current += delta * 0.2;
      }

      // Smooth lerp rotation
      currentRotationYRef.current +=
        (targetRotationYRef.current - currentRotationYRef.current) * 0.1;

      if (orbitGroupRef.current) {
        orbitGroupRef.current.rotation.y = currentRotationYRef.current;
      }

      // Orient tool nodes to always face camera
      meshes.forEach((mesh) => {
        mesh.lookAt(camera.position);

        // Calculate closest mesh to front (z maximum)
        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);

        // Calculate scale boost based on distance to camera front
        const distZ = worldPos.z;
        const scaleFactor = Math.max(0.7, (distZ + radius) / (radius * 1.8));
        mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
      });

      // Update selected index based on nearest node to camera front
      let maxZ = -999;
      let closestIndex = 0;
      meshes.forEach((mesh, idx) => {
        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);
        if (worldPos.z > maxZ) {
          maxZ = worldPos.z;
          closestIndex = idx;
        }
      });

      setSelectedIndex(closestIndex);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      if (container) container.innerHTML = "";
    };
  }, [isAutoRotate]);

  // Rotate to specific tool click
  const selectTool = (idx: number) => {
    playClick();
    setSelectedIndex(idx);
    const numTools = AI_TOOLS_DATA.length;
    const targetAngle = -(idx / numTools) * Math.PI * 2 + Math.PI / 2;
    targetRotationYRef.current = targetAngle;
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-center overflow-hidden py-24">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full">
        {/* Left Side: 3D Canvas Orbit Container */}
        <div className="lg:col-span-7 relative h-[450px] md:h-[580px] w-full border border-white/10 rounded-3xl bg-black/40 backdrop-blur-xl overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.03)] group">
          {/* Three.js canvas container */}
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Interactive Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-gray-400 uppercase hidden sm:inline">3D TOOL ORBIT ENGINE</span>
              <span className="text-white font-bold">[{selectedIndex + 1}/{AI_TOOLS_DATA.length}]</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                onMouseEnter={playHover}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors flex items-center gap-1.5 text-gray-300 hover:text-white"
              >
                {isAutoRotate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isAutoRotate ? "PAUSE ORBIT" : "SPIN ORBIT"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Selected AI Tool Card Detail */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTool.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-black/80 border border-white/20 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,255,255,0.08)] space-y-6 relative overflow-hidden"
            >
              {/* Subtle accent tag */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-mono text-white tracking-widest uppercase">
                  {selectedTool.category}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {selectedTool.stats}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-black/60 border border-white/20 rounded-2xl flex items-center justify-center w-12 h-12 shadow-inner">
                    <img
                      src={selectedTool.logo}
                      alt={selectedTool.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-mono text-white tracking-wider">
                      {selectedTool.name}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-400 uppercase">
                      BRAND COLOR: <span style={{ color: selectedTool.color }} className="font-bold">{selectedTool.color}</span>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 font-mono mt-2 leading-relaxed">
                  "{selectedTool.tagline}"
                </p>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                {selectedTool.description}
              </p>

              {/* Capabilities checklist */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                  KEY CAPABILITIES
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedTool.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-mono text-gray-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10"
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompt Example Box */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1 font-mono text-xs">
                <div className="flex justify-between text-[10px] text-gray-400 uppercase tracking-wider">
                  <span>SAMPLE PROMPT</span>
                  <span>LATENT INPUT</span>
                </div>
                <p className="text-gray-300 italic text-[11px] line-clamp-2">
                  "{selectedTool.promptExample}"
                </p>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={selectedTool.link}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  className="flex-1 py-3 bg-white text-black font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg"
                >
                  <span>LAUNCH TOOL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={selectedTool.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-colors flex items-center justify-center"
                  title="Official Documentation"
                >
                  <BookOpen className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick Icon Selector Ring */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 custom-scrollbar">
            {AI_TOOLS_DATA.map((tool, idx) => (
              <button
                key={tool.id}
                onClick={() => selectTool(idx)}
                onMouseEnter={playHover}
                className={`p-2 rounded-xl border transition-all duration-300 flex-shrink-0 flex items-center gap-2 text-xs font-mono ${
                  selectedIndex === idx
                    ? "bg-white text-black border-white font-bold scale-105 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                <img src={tool.logo} alt={tool.name} className="w-4 h-4 rounded-md object-cover" />
                <span>{tool.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
