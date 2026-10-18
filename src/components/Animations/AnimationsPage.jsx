import React, { Suspense } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import Particle from "../Particle";
import "./Animations.css";

function MotionScene({ accent, secondary }) {
  const groupRef = React.useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.55;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={1.7} floatIntensity={2.1}>
        <mesh>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.8}
            metalness={0.75}
            roughness={0.18}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={2.1} rotationIntensity={2.1} floatIntensity={2.5}>
        <mesh rotation={[0.9, 0.6, 0.3]}>
          <torusKnotGeometry args={[2.2, 0.26, 220, 28]} />
          <meshStandardMaterial
            color={secondary}
            emissive={secondary}
            emissiveIntensity={0.7}
            metalness={1}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Sparkles count={100} scale={[7, 7, 7]} size={3} speed={0.7} color={secondary} />
    </group>
  );
}

function ThreeShowcaseCard({ title, description, accent, secondary, badge }) {
  return (
    <div
      className="animation-showcase"
      style={{ "--accent": accent, "--secondary": secondary }}
    >
      <div className="scene-shell">
        <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 2]}>
          <color attach="background" args={["#050816"]} />
          <fog attach="fog" args={["#050816", 8, 18]} />
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 5, 4]} intensity={1.5} />
          <pointLight position={[-4, -2, 2]} color={accent} intensity={26} />
          <Suspense fallback={null}>
            <MotionScene accent={accent} secondary={secondary} />
          </Suspense>
          <Stars radius={36} depth={26} count={2200} factor={4} fade speed={0.8} />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.9} />
        </Canvas>
      </div>
      <div className="animation-copy">
        <span className="animation-badge">{badge}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function AnimationsPage() {
  const animations = [
    {
      title: "Realtime Motion Lab",
      badge: "Realtime",
      accent: "#8b5cf6",
      secondary: "#67e8f9",
      description: "Procedural geometry, glowing materials and camera motion designed to feel cinematic in a portfolio setting."
    },
    {
      title: "Cinematic VFX Playground",
      badge: "VFX",
      accent: "#f472b6",
      secondary: "#fbbf24",
      description: "Layered lighting and orbital motion brings a polished, product-showcase energy to the animation section."
    }
  ];

  return (
    <Container fluid className="animations-section">
      <Particle />
      <Container>
        <div className="text-center">
          <span className="section-eyebrow">~/ motion</span>
          <h1 className="animations-heading">
            3D <span className="purple">Animation</span> Showcase
          </h1>
          <p className="section-subtitle">
            Experiments in motion, rendering and real-time graphics.
          </p>
        </div>
        <Row className="animations-grid-row">
          {animations.map((anim, index) => (
            <Col md={6} className="animation-card" key={index}>
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="animation-card-view">
                  <ThreeShowcaseCard
                    title={anim.title}
                    description={anim.description}
                    badge={anim.badge}
                    accent={anim.accent}
                    secondary={anim.secondary}
                  />
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default AnimationsPage;