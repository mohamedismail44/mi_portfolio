"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import useThemeSwitcher from "../hooks/useThemeSwitcher"; // عدل المسار حسب مكان الملف

export default function ParticlesContainer() {
  const [init, setInit] = useState(false);

  const [activeTheme] = useThemeSwitcher(); // نحصل على الثيم مباشرة من hook

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(() => {
    const particleColor = activeTheme === "dark" ? "#6b7280" : "#6366f1";
console.log("theme",activeTheme);

    return {
      fullScreen: { enable: false },
      background: {
        color: { value: "" },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: particleColor },
        links: {
          color: particleColor,
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          speed: 1,
        },
        number: {
          density: { enable: true },
          value: 200,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    };
  }, [activeTheme]); // مهم: نحدث options عند تغيير الثيم

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return null;
}
