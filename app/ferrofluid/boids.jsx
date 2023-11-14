'use client'

import { Instance, Instances } from '@react-three/drei'
import { Vector3 } from 'three'
import createECS from 'miniplex-react'
import { SpatialHashMap } from './systems/SpatialHashingSystem'
import { World } from 'miniplex'

const ECS = createECS(new World())
const boids = ECS.world.with('boid', 'jsx')

export default function Boids() {
  return (
    <Instances>
      <icosahedronGeometry />
      <meshStandardMaterial color='#000000' />

      <ECS.Entities in={boids} children={(e) => e.jsx} />
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
        <Instance position={position} scale={0.5} />
      </ECS.Component>
    ),
  })
}
