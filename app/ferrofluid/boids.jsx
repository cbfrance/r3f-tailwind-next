'use client'

import { Instance, Instances } from '@react-three/drei'
import { Vector3 } from 'three'
import { SpatialHashMap } from './systems/SpatialHashingSystem'

import { ECS } from './state'
// import { Blob2 } from '@/components/canvas/Blob2'
import { MeshDistortMaterial } from '@react-three/drei'

const boids = ECS.world.with('boid', 'jsx')

export default function Boids() {
  return (
    <Instances>
      {/* <icosahedronGeometry /> */}
      <sphereGeometry />
      {/* <Blob2 sphereGeometry1={1} sphereGeometry2={64} sphereGeometry3={64} /> */}

      <meshStandardMaterial color='#000000' />
      <MeshDistortMaterial roughness={0} color={'#000'} />
      <ECS.Entities in={boids}>{(e) => e.jsx}</ECS.Entities>
    </Instances>
  )
}

const boidsSpatialHashMap = new SpatialHashMap(5)

export const spawnBoid = ({ position, velocity = new Vector3() }) => {
  ECS.world.add({
    boid: true,
    velocity,
    neighbors: [],
    spatialHashMap: boidsSpatialHashMap,
    forces: {
      coherence: new Vector3(),
      separation: new Vector3(),
      alignment: new Vector3(),
      avoidEdges: new Vector3(),
    },
    jsx: (
      <ECS.Component name='transform'>
        <Instance position={position} scale={1} />
      </ECS.Component>
    ),
  })
}
