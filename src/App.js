import './App.css';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, MapControls, OrbitControls, Plane, Select, useFBX, useGLTF, useHelper, usePerformanceMonitor, useProgress } from '@react-three/drei';
import { useState, useRef, Suspense } from 'react';
import { DirectionalLightHelper } from 'three';

import Content from './Content';
import { Bloom, EffectComposer, Outline, SMAA } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing'

function degreeToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center >{progress} % loaded</Html>
}

// useSelect needs to be in a Child of <Select> 
function MyTorus({ url, ...props }) {
  const model = useGLTF(url)

  const modelRef = useRef();

  return (
    <primitive object={model.scene} />

  )
}

const Light = () => {
  const dirLight = useRef()
  useHelper(dirLight, DirectionalLightHelper, "red");

  return (
    <>
      <directionalLight color={"#fefeef"} intensity={1} ref={dirLight} position={[5, 5, -5]} castShadow />
    </>
  );
};

function App() {
  const [selected, setSelected] = useState([])
  const loader = useProgress()
  console.log(selected)

  return (
    <div className='App'>

      <div className='canvas'>

        <Canvas camera={{ position: [5, 5, 0] }} >
          <Suspense fallback={<Loader />}>
            <MapControls />
            <ambientLight intensity={0.5} />
            <Select box multiple onChange={setSelected}>
              <MyTorus recieveShadow scale={1} position={[0, 0.1, 0]} rotation={[0, degreeToRad(180), 0]} url={"/objects/scene_3.glb"} />
            </Select>

            <Light />
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
        </div>
      }

    </div >


  );
}

export default App;
