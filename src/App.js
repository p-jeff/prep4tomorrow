import './App.css';
import { Canvas } from '@react-three/fiber';
import { AccumulativeShadows, Environment, Html, MapControls, Plane, Select, useGLTF, useProgress, RandomizedLight, useTexture, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { useState, Suspense, useEffect } from 'react';
import Content from './Content';
import { EffectComposer, Outline, SMAA } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing'

function degreeToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function Loader() {
  const { progress } = useProgress()
  return <Html center className='loading'>{Math.round(progress)} % loaded</Html>
}

// useSelect needs to be in a Child of <Select> 
function MyScene({ url, ...props }) {
  const model = useGLTF(url)
  model.scene.traverse(function (node) {
    if (node.isMesh) { node.castShadow = true; }
  });

  const [hovered, setHovered] = useState(false)


  useEffect(() => {
    const element = document.querySelector('.App')
    element.className = hovered ? "App test" : "App"
  }, [hovered])

  return (
    <primitive object={model.scene} className="prim" onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)} />
  )
}

function TilePlane({ ...props }) {
  const normal = useTexture(process.env.PUBLIC_URL + "/tile.jpg")

  return (
    <>
      <Plane receiveShadow rotation={[degreeToRad(270), 0, 0]} scale={[10, 10, 10]} position={[0, -0.2, 0]}>
        <meshStandardMaterial color={'white'} normalMap={normal} normalScale={(1, 3)} />
      </Plane>
      <Plane receiveShadow rotation={[degreeToRad(270), 0, 0]} scale={[10, 10, 10]} position={[10, -0.2, 10]}>
        <meshStandardMaterial color={'white'} normalMap={normal} normalScale={(1, 3)} />
      </Plane>
      <Plane receiveShadow rotation={[degreeToRad(270), 0, 0]} scale={[10, 10, 10]} position={[-10, -0.2, -10]}>
        <meshStandardMaterial color={'white'} normalMap={normal} normalScale={(1, 3)} />
      </Plane>
      <Plane receiveShadow rotation={[degreeToRad(270), 0, 0]} scale={[10, 10, 10]} position={[10, -0.2, -10]}>
        <meshStandardMaterial color={'white'} normalMap={normal} normalScale={(1, 3)} />
      </Plane>
      <Plane receiveShadow rotation={[degreeToRad(270), 0, 0]} scale={[10, 10, 10]} position={[-10, -0.2, 10]}>
        <meshStandardMaterial color={'white'} normalMap={normal} normalScale={(1, 3)} />
      </Plane>
      <Plane receiveShadow rotation={[degreeToRad(270), 0, 0]} scale={[10, 10, 10]} position={[0, -0.2, -10]}>
        <meshStandardMaterial color={'white'} normalMap={normal} normalScale={(1, 3)} />
      </Plane>
      <Plane receiveShadow rotation={[degreeToRad(270), 0, 0]} scale={[10, 10, 10]} position={[-10, -0.2, 0]}>
        <meshStandardMaterial color={'white'} normalMap={normal} normalScale={(1, 3)} />
      </Plane>
      <Plane receiveShadow rotation={[degreeToRad(270), 0, 0]} scale={[10, 10, 10]} position={[10, -0.2, 0]}>
        <meshStandardMaterial color={'white'} normalMap={normal} normalScale={(1, 3)} />
      </Plane>
      <Plane receiveShadow rotation={[degreeToRad(270), 0, 0]} scale={[10, 10, 10]} position={[0, -0.2, 10]}>
        <meshStandardMaterial color={'white'} normalMap={normal} normalScale={(1, 3)} />
      </Plane>
    </>

  )


}
function App() {
  const [selected, setSelected] = useState([])
  const loader = useProgress()

  return (

    <div className='App'>
      <div className='canvas'>
        <Canvas camera={{ position: [6, 2, 6] }} shadows="true" >
          <Suspense fallback={<Loader />}>
            <MapControls autoRotate autoRotateSpeed={0.2} maxDistance={10} minDistance={2} />
            <ambientLight intensity={0.5} />

            <Select box multiple onChange={setSelected}>
              <MyScene scale={1} position={[0, 0.1, 0]} rotation={[0, degreeToRad(180), 0]} url={process.env.PUBLIC_URL + "/mints.glb"} />
            </Select>

            <TilePlane scale={2} />

            <directionalLight color={"#fefeef"} intensity={0.1} position={[5, 5, -5]} castShadow />

            <Environment files={process.env.PUBLIC_URL + "/studio.hdr"} />

            < AccumulativeShadows temporal frames={30} scale={100} resolution={2048} colorBlend={10} blur={5}>
              <RandomizedLight amount={8} position={[5, 5, 3]} />
            </AccumulativeShadows>


            <GizmoHelper alignment="bottom-right" margin={[80, 80]} renderPriority={2}>
              <GizmoViewport axisColors={["hotpink", "aquamarine", "#3498DB"]} labelColor="black" />
            </GizmoHelper>


            <EffectComposer multisampling={0} autoClear={false}>
              <SMAA />
              <Outline selection={selected} visibleEdgeColor="white" hiddenEdgeColor="white" edgeStrength={100} blur blendFunction={BlendFunction.ALPHA} kernelSize={KernelSize.LARGE} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
      {
        loader.progress === 100 &&
        < div className='container'>
          <Content object={selected.length === 1 ? selected : "placeholder"} />
        </div>
      }
      <div className='bosom'>
        &emsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shift" viewBox="0 0 16 16">
          <path d="M 3 5.188 C 3 2.341 5.22 0 8 0 s 5 2.342 5 5.188 v 5.625 C 13 13.658 10.78 16 8 16 s -5 -2.342 -5 -5.188 V 5 z V 5.5 h 0 z m 5 -0.188 V 5.5 H 12 v -0.313 c 0 -2.152 -1.541 -3.898 -4 -4.187 z M 12 6.5 H 4 v 4.313 C 4 13.145 5.81 15 8 15 s 4 -1.855 4 -4.188 V 6.5 z" />
        </svg>
        &nbsp; Pan &emsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shift" viewBox="0 0 16 16">
          <path d="M 3 5.188 C 3 2.341 5.22 0 8 0 s 5 2.342 5 5.188 v 5.625 C 13 13.658 10.78 16 8 16 s -5 -2.342 -5 -5.188 V 5.189 z m 4.5 -4.155 C 5.541 1.289 4 3.035 4 5.188 V 5.5 h 4 V 1.033 z V 1 z M 12 6.5 H 4 v 4.313 C 4 13.145 5.81 15 8 15 s 4 -1.855 4 -4.188 V 6.5 z" />
        </svg>
        &nbsp; Rotate
      </div>
    </div >


  );
}

export default App;
