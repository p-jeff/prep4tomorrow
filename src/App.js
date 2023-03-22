import './App.css';
import { Canvas } from '@react-three/fiber';
import { MapControls, Plane, Select, useSelect } from '@react-three/drei';
import { useState, useRef } from 'react';
import { BoxGeometry, Matrix4, Vector3 } from 'three';

function degreeToRad(degrees) {
  return degrees * (Math.PI / 180);
}


//this function checks if an object is selected -> and returns the tag of the selected object

function logObjectIfDefined(obj) {
  if (typeof obj === 'object' && obj !== null) {
    // console.log(obj);
    return obj
  } else {
    //console.log('Object is not defined');
    return 'none'
  }
}

function boundingBox(ref) {
  if (ref.geometry !== undefined) {
    ref.geometry.computeBoundingBox() //initially computing a bounding box
    let box3 = ref.geometry.boundingBox

    //box 3 only has min and max vectors, the following will make a float32array out of the initial 2 vectors
    const dimensions = new Vector3().subVectors(box3.max, box3.min);
    const boxGeo = new BoxGeometry(dimensions.x, dimensions.y, dimensions.z);

    // move new mesh center so it's aligned with the original object
    const matrix = new Matrix4().setPosition(dimensions.addVectors(box3.min, box3.max).multiplyScalar(0.5));
    boxGeo.applyMatrix4(matrix);

    return boxGeo
  }
}


// useSelect needs to be in a Child of <Select> 
function MyTorus({ ...props }) {
  const selected = useSelect()

  let current = logObjectIfDefined(selected[0])
  // tag is going to be identifier of shown text

  let isSelected = current.tag === props.tag
  let myRef = useRef()

  let checkedRef = logObjectIfDefined(myRef.current)
  let box = boundingBox(checkedRef)
  console.log(box)


  return (
    <group>
      <mesh {...props} ref={myRef}>
        <torusGeometry />
        <meshNormalMaterial />

        {/*
      Replace with bounding box
     
  */}
      </mesh>
      {isSelected ? <mesh geometry={box} {...props}>
        <meshStandardMaterial wireframe />
      </mesh> : <></>}



    </group >
  )
}
/* */

function App() {
  const [, setSelected] = useState([])

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
