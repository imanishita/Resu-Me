import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // use loadFull if you need full features

const AnimatedBG = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine); // load only the slim engine
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
