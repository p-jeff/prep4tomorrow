import './App.css';
import { Canvas } from '@react-three/fiber';
import { MapControls, Plane, Select, useSelect, Edges } from '@react-three/drei';
import { useState } from 'react';


function degreeToRad(degrees) {
  return degrees * (Math.PI / 180);
}

// Thanks chatGPT
//this function checks if an object is selected -> and returns the tag of the selected object

function logObjectIfDefined(obj) {
  let current
  if (typeof obj === 'object' && obj !== null) {
    current = obj.tag
    // console.log(obj);
    return current
  } else {
    //console.log('Object is not defined');
    return 'none'
  }
}


// useSelect needs to be in a Child of <Select> 
function MyTorus({ ...props }) {
  const selected = useSelect()

  let current = logObjectIfDefined(selected[0])
  // tag is going to be identifier of shown text

  let isSelected = current === props.tag


  return (
    <mesh {...props}>
      <torusGeometry />
      <meshNormalMaterial />

      {/*
      Replace with bounding box
      <Edges visible={isSelected} scale={1.1} renderOrder={1000}>
        <meshBasicMaterial transparent color="#333" depthTest={false} />
  </Edges>
  */}
    </mesh>
  )
}
/* */

function App() {
  const [selected, setSelected] = useState([])

  return (
    <div className='App'>
      <Canvas camera={{ position: [5, 5, 0] }} >
        <MapControls />
        <ambientLight intensity={0.1} />
        <Plane args={[10, 10, 10]} rotation={[degreeToRad(-90), 0, 0]} />
        <Select box multiple onChange={setSelected}>
          <MyTorus scale={0.9} position={[-1, 0, 0]} tag={22} />
          <MyTorus scale={0.9} position={[1, 0, 0]} tag={23} />
        </Select>
      </Canvas>
    </ div >
  );
}

export default App;
