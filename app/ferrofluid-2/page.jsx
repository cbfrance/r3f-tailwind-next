'use client'

import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MarchingCubes, MarchingCube, MeshTransmissionMaterial, Environment, Bounds, Text } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import { useControls } from 'leva'

function MetaBall({ color, vec = new THREE.Vector3(), ...props }) {
  const api = useRef()
  useFrame((state, delta) => {
    delta = Math.min(delta, 0.1)
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiplyScalar(delta * -0.05),
    )
  })
  return (
    <RigidBody ref={api} colliders={false} linearDamping={4} angularDamping={0.95} {...props}>
      <MarchingCube strength={0.35} subtract={1} color={color} />
      <mesh>
        <sphereGeometry args={[0.04]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <BallCollider args={[0.1]} type='dynamic' />
    </RigidBody>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ pointer, viewport }) => {
    const { width, height } = viewport.getCurrentViewport()
    vec.set(pointer.x * (width / 2), pointer.y * (height / 2), 0)
    ref.current.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody type='kinematicPosition' colliders={false} ref={ref}>
      <MarchingCube strength={0.5} subtract={10} color={'black'} />
      <mesh>
        <sphereGeometry args={[0.04]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <BallCollider args={[0.1]} type='dynamic' />
    </RigidBody>
  )
}

export default function App() {
  const {
    color,
    distortion,
    vertexColors,
    transmissionSampler,
    transmission,
    thickness,
    roughness,
    chromaticAberration,
    anisotropy,
    envMapIntensity,
    distortionScale,
    temporalDistortion,
    iridescence,
    iridescenceIOR,
    iridescenceThicknessRange,
    toneMapped,
  } = useControls({
    color: 'black',
    distortion: 0.5,
    vertexColors: true,
    transmissionSampler: true,
    transmission: 0.925,
    thickness: 0.15,
    roughness: 0,
    chromaticAberration: 0,
    anisotropy: 0.5,
    envMapIntensity: 0.1,
    distortionScale: 0.5,
    temporalDistortion: 1,
    iridescence: 1,
    iridescenceIOR: 1,
    iridescenceThicknessRange: [0, 1400],
    toneMapped: true,
  })

  return (
    <Canvas style={{ cursor: 'none' }} dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 25 }}>
      <color attach='background' args={['#fff']} />
      <ambientLight intensity={2} />
      <Physics gravity={[0, 2, 0]}>
        <MarchingCubes resolution={80} maxPolyCount={20000} enableUvs={false} enableColors>
          <MeshTransmissionMaterial
            vertexColors={vertexColors}
            transmissionSampler={transmissionSampler}
            transmission={transmission}
            thickness={thickness}
            roughness={roughness}
            chromaticAberration={chromaticAberration}
            anisotropy={anisotropy}
            envMapIntensity={envMapIntensity}
            distortion={distortion}
            distortionScale={distortionScale}
            temporalDistortion={temporalDistortion}
            iridescence={iridescence}
            iridescenceIOR={iridescenceIOR}
            iridescenceThicknessRange={iridescenceThicknessRange}
            toneMapped={toneMapped}
          />
          <MetaBall color={color} position={[1, 1, 0.5]} />
          <MetaBall color={color} position={[-1, -1, -0.5]} />
          <MetaBall color={color} position={[2, 2, 0.5]} />
          <MetaBall color={color} position={[-2, -2, -0.5]} />
          <MetaBall color={color} position={[3, 3, 0.5]} />
          <MetaBall color={color} position={[-3, -3, -0.5]} />
          <Pointer />
        </MarchingCubes>
      </Physics>
      {/* <Text
        font="Inter_Regular.json"
        letterSpacing={-0.05}
        lineHeight={0.8}
        position={[0, 0, -2]}
        color="#000"
        material-transparent={false}>{`ferro\nfluid?`}</Text> */}
      <Environment files='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/rosendal_mountain_midmorning_1k.hdr' />
      {/* Zoom to fit a 1/1/1 box to match the marching cubes */}
      <Bounds fit clip observe margin={1}>
        <mesh visible={false}>
          <boxGeometry />
        </mesh>
      </Bounds>
    </Canvas>
  )
}
