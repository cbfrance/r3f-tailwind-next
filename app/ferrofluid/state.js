import { With, World } from 'miniplex'
import createECS from 'miniplex-react'
import { ReactNode } from 'react'
import { Object3D, Vector3 } from 'three'
import { SpatialHashMap } from './systems/SpatialHashingSystem'

/**
 * @typedef {Object} Entity
 * @property {boolean} [boid]
 * @property {Vector3} [velocity]
 * @property {With<Entity, "transform" | "velocity">[]} [neighbors]
 * @property {SpatialHashMap} [spatialHashMap]
 * @property {Object} forces
 * @property {Vector3} forces.coherence
 * @property {Vector3} forces.separation
 * @property {Vector3} forces.alignment
 * @property {Vector3} forces.avoidEdges
 * @property {Object3D} [transform]
 * @property {ReactNode} [jsx]
 */

export const ECS = createECS(new World())
