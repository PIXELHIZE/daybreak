import { useEffect, useMemo } from "react";
import ParticlesBackground from "../components/Particles";

export default function Dashboard() {
  const memoizedParticles = useMemo(() => <ParticlesBackground />, []);

  useEffect(() => {});

  return (
    <main>
      {memoizedParticles}
      <h1>{}</h1>
    </main>
  );
}
