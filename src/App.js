import './App.css';
import { Canvas } from '@react-three/fiber';
import { MapControls, OrbitControls, Plane, Torus } from '@react-three/drei';

function degreeToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function App() {
  return (
    <div className='App' >
      <Canvas camera={{ position: [5, 5, 0] }}>
        <MapControls />
        <ambientLight intensity={0.1} />
        <Plane args={[10, 10, 10]} rotation={[degreeToRad(-90), 0, 0]} />
        <Torus position={[0, 0.4, 0]} rotation={[degreeToRad(-90), 0, 0]}>
          <meshNormalMaterial />
        </Torus>
      </Canvas>

    </div >
  );
}

export default App;
