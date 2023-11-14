'use client'

import dynamic from 'next/dynamic'
import { useControls } from 'leva'
// Boids is the example from miniplex-react which shows how to use "systems"
// to control animations in frameworks like r3f
import Boids from './Boids'

import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { StrictMode } from 'react'
import AlignmentSystem from './systems/AlignmentSystem'
import ApplyForcesSystem from './systems/ApplyForcesSystem'
import AvoidEdgesSystem from './systems/AvoidEdgesSystem'
import CoherenceSystem from './systems/CoherenceSystem'
import IdentifyNeighborSystem from './systems/IdentifyNeighborSystem'
import SeparationSystem from './systems/SeparationSystem'
import SpatialHashingSystem from './systems/SpatialHashingSystem'
import VelocitySystem from './systems/VelocitySystem'
import WorldSetupSystem from './systems/WorldSetupSystem'

export default function Page() {
  const {
    maxDistance,
    coherenceFactor,
    separationFactor,
    alignmentFactor,
    avoidEdgesFactor,
    avoidEdgesMaxDistance,
    velocityMax,
  } = useControls({
    // maxDistance: 3, // causes lag when changed
    coherenceFactor: 3,
    separationFactor: 8,
    alignmentFactor: 1,
    avoidEdgesFactor: 5,
    avoidEdgesMaxDistance: 20,
    velocityMax: 0.5,
  })

  return (
    <Canvas>
      {/*
      R3F unfortunately doesn't inherit <StrictMode> from outside
      its canvas, so we need to explicitly re-enable it if we want to make use of it.
      We're doing this here mostly to prove that Miniplex 2.0 works with it :-)
      */}
      <StrictMode>
        {/* <ambientLight intensity={0} /> */}
        {/* <directionalLight position={[1, 2, 3]} intensity={0.1} /> */}
        <PerspectiveCamera makeDefault position={[0, 0, 50]} />
        <OrbitControls />

        <Boids />

        {/* <Common /> */}
        <WorldSetupSystem />
        <SpatialHashingSystem />
        <IdentifyNeighborSystem />
        <CoherenceSystem factor={coherenceFactor} />
        <SeparationSystem factor={separationFactor} />
        <AlignmentSystem factor={alignmentFactor} />
        <AvoidEdgesSystem factor={avoidEdgesFactor} maxDistance={avoidEdgesMaxDistance} />
        <ApplyForcesSystem />
        <VelocitySystem maxVelocity={velocityMax} />
      </StrictMode>
    </Canvas>
  )
}
