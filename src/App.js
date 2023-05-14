import './App.css';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, MapControls, Select, useGLTF, useProgress } from '@react-three/drei';
import { useState, Suspense } from 'react';
import Content from './Content';
import { EffectComposer, Outline, SMAA } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing'

function degreeToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function Loader() {
  const { progress } = useProgress()
  return <Html center >{progress} % loaded</Html>
}

// useSelect needs to be in a Child of <Select> 
function MyScene({ url, ...props }) {
  const model = useGLTF(url)
  return (
    <primitive object={model.scene} />
  )
}

function App() {
  const [selected, setSelected] = useState([])
  const loader = useProgress()
  return (
    <div className='App'>
      <div className='canvas'>
        <Canvas camera={{ position: [5, 5, 0] }} >
          <Suspense fallback={<Loader />}>
            <MapControls />
            <ambientLight intensity={0.5} />
            <Select box multiple onChange={setSelected}>
              <MyScene recieveShadow scale={1} position={[0, 0.1, 0]} rotation={[0, degreeToRad(180), 0]} url={"/objects/scene_3.glb"} />
            </Select>
            <directionalLight color={"#fefeef"} intensity={1} position={[5, 5, -5]} castShadow />
            <Environment preset="studio" />
            <EffectComposer multisampling={0} autoClear={false}>
              <SMAA />
              <Outline selection={selected} visibleEdgeColor="white" hiddenEdgeColor="white" edgeStrength={100} blur blendFunction={BlendFunction.ALPHA} kernelSize={KernelSize.LARGE} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
      {loader.progress === 100 &&
        < div className='content'>
          <Content object={selected.length === 1 ? selected : "placeholder"} />
        </div>}
    </div >
  );
}

export default App;
