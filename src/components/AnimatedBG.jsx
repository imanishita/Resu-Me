import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; // or loadFull from "tsparticles"

const AnimatedBG = () => {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine); // load only the slim engine (or loadFull for full features)
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#000000"
        },
        fpsLimit: 60,
        particles: {
          color: { value: "#ffffff" },
          links: { enable: true, color: "#ffffff" },
          move: { enable: true, speed: 1 },
          number: { value: 60 },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: 3 },
        },
      }}
    />
  );
};

export default AnimatedBG;
