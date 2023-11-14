'use client'

import dynamic from 'next/dynamic'

// Boids is the example from miniplex-react which shows how to use "systems"
// to control animations in frameworks like r3f
import Boids from './boids'

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
  return (
    <Canvas>
      {/*
      R3F unfortunately doesn't inherit <StrictMode> from outside
      its canvas, so we need to explicitly re-enable it if we want to make use of it.
      We're doing this here mostly to prove that Miniplex 2.0 works with it :-)
      */}
      <StrictMode>
        <ambientLight intensity={0.2} />
        <directionalLight position={[1, 2, 3]} intensity={0.8} />
        <PerspectiveCamera makeDefault position={[0, 0, 50]} />
        <OrbitControls />
        <Boids />

        {/* <View className='absolute top-0 flex h-screen w-full flex-col items-center justify-center'>
                <Boids />
                <Common />
            </View> */}

        <WorldSetupSystem />
        <SpatialHashingSystem />
        <IdentifyNeighborSystem maxDistance={3} />
        <CoherenceSystem factor={3} />
        <SeparationSystem factor={8} />
        <AlignmentSystem factor={1} />
        <AvoidEdgesSystem factor={5} maxDistance={20} />
        <ApplyForcesSystem />
        <VelocitySystem maxVelocity={6} />
      </StrictMode>
    </Canvas>
  )
}

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
