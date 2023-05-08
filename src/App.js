import './App.css';
import { Canvas } from '@react-three/fiber';
import { Environment, MapControls, OrbitControls, Plane, Select, useFBX, useHelper } from '@react-three/drei';
import { useState, useRef } from 'react';
import { DirectionalLightHelper } from 'three';

import Content from './Content';
import { EffectComposer, Outline, SMAA } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing'

function degreeToRad(degrees) {
  return degrees * (Math.PI / 180);
}

// useSelect needs to be in a Child of <Select> 
function MyTorus({ url, ...props }) {
  const model = useFBX(url);
  const modelRef = useRef();

  return (
    <mesh {...props} ref={modelRef} >
      <primitive object={model} />
    </mesh>
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


  return (
    <div className='App'>
      <div className='canvas'>
        <Canvas camera={{ position: [5, 5, 0] }} >
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <Select box multiple onChange={setSelected}>
            <MyTorus recieveShadow scale={1} position={[0, 0.1, 0]} rotation={[0, degreeToRad(180), 0]} url={"/objects/eco_cream.fbx"} />
          </Select>

          <Light />
          <Environment preset="studio" />
          <EffectComposer multisampling={0} autoClear={false}>
            <SMAA />
            <Outline selection={selected} visibleEdgeColor="white" hiddenEdgeColor="white" edgeStrength={100} blur blendFunction={BlendFunction.ALPHA} kernelSize={KernelSize.LARGE} />

          </EffectComposer>
        </Canvas>
      </div>
      {selected.length === 1 && <>
        {/*will only render when length is exactly 1 -> this happens once something is selected */}
        <div className='content'>
          <Content object={selected} />
        </div>
        <button onClick={() => setSelected([])} className='cancel'>X</button>
      </>}
    </div >

  );
}

export default App;
