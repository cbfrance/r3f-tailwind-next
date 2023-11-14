import { useFrame } from '@react-three/fiber'
import { ECS } from '../state'

const entities = ECS.world.with('transform', 'velocity')

const VelocitySystem = function ({ maxVelocity = 1 }) {
  useFrame(function VelocitySystem(_, dt) {
    for (const { transform, velocity } of entities) {
      /* Dampen velocity */
      // velocity.multiplyScalar(0.999)

      /* Clamp velocity  */
      velocity.clampLength(0, maxVelocity)

      /* Apply velocity */
      transform.position.addScaledVector(velocity, dt)
    }
  })

  return null
}

export default VelocitySystem
