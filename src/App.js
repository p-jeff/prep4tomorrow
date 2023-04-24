import './App.css';
import { Canvas } from '@react-three/fiber';
import { MapControls, Plane, Select, useFBX, useHelper } from '@react-three/drei';
import { useState, useRef } from 'react';
import { DirectionalLightHelper } from 'three';

import Content from './Content';
import { EffectComposer, Outline } from '@react-three/postprocessing';

function degreeToRad(degrees) {
  return degrees * (Math.PI / 180);
}

// useSelect needs to be in a Child of <Select> 
function MyTorus({ url, ...props }) {


  //console.log(box)

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
          <MapControls />
          <ambientLight intensity={0.5} />
          <pointLight position={[1, 1, 1]} intensity={100} />
          <Plane receiveShadow args={[100, 100, 100]} rotation={[degreeToRad(-90), 0, 0]}>
            <meshBasicMaterial color={"#fff"} />

          </Plane>
          <Select box multiple onChange={setSelected}>
            <MyTorus recieveShadow scale={0.03} position={[0, 0.1, 0]} tag={'circus'} url={"/objects/test3.fbx"} />
            <MyTorus recieveShadow scale={0.003} position={[-2, 0.2, -2]} tag={'circus'} url={"/objects/test4.fbx"} />
          </Select>

          <Light />
          <EffectComposer multisampling={0} autoClear={false}>
            <Outline selection={selected} visibleEdgeColor="white" hiddenEdgeColor="white" blur edgeStrength={100} />
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
