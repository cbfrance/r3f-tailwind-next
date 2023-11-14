import { useFrame } from '@react-three/fiber'
import { ECS } from '../state'

const entities = ECS.world.with('forces', 'velocity')

const ApplyForcesSystem = function () {
  useFrame(function ApplyForcesSystem(_, dt) {
    for (const { forces, velocity } of entities) {
      velocity.addScaledVector(forces.coherence, dt)
      velocity.addScaledVector(forces.separation, dt)
      velocity.addScaledVector(forces.alignment, dt)
      velocity.addScaledVector(forces.avoidEdges, dt)
    }
  })

  return null
}

export default ApplyForcesSystem
