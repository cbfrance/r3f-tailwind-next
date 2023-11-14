'use client'
import { useFrame } from '@react-three/fiber'
import { World } from 'miniplex'
import createECS from 'miniplex-react'

const ECS = createECS(new World())

export class SpatialHashMap {
  cells = new Map()
  entityToCell = new WeakMap()

  constructor(cellSize) {
    this.cellSize = cellSize
  }

  setEntity(entity, x, y, z) {
    const cell = this.getCell(x, y, z)

    /* Remove from previous hash if known */
    const oldCell = this.entityToCell.get(entity)

    if (oldCell) {
      /* If hash didn't change, do nothing */
      if (oldCell === cell) return

      /* Remove from previous hash */
      oldCell.delete(entity)
    }

    cell.add(entity)
    this.entityToCell.set(entity, cell)
  }

  removeEntity(entity) {
    const cell = this.entityToCell.get(entity)
    cell?.delete(entity)
    this.entityToCell.delete(entity)
  }

  getNearbyEntities(x, y, z, radius, entities = [], maxEntities = Infinity) {
    let count = 0
    entities.length = 0

    for (let dx = x - radius; dx <= x + radius; dx += this.cellSize) {
      for (let dy = y - radius; dy <= y + radius; dy += this.cellSize) {
        for (let dz = z - radius; dz <= z + radius; dz += this.cellSize) {
          const cell = this.getCell(dx, dy, dz)

          for (const entity of cell) {
            entities.push(entity)
            count++

            if (count >= maxEntities) return entities
          }
        }
      }
    }

    return entities
  }

  getCell(x, y, z) {
    const hash = this.calculateHash(x, y, z, this.cellSize)

    if (!this.cells.has(hash)) {
      this.cells.set(hash, new Set())
    }

    return this.cells.get(hash)
  }

  calculateHash(x, y, z, cellSize) {
    const hx = Math.floor(x / cellSize)
    const hy = Math.floor(y / cellSize)
    const hz = Math.floor(z / cellSize)

    return `${hx}:${hy}:${hz}`
  }
}

const entities = ECS.world.with('transform', 'spatialHashMap')

export default function ({ cellSize = 1 }) {
  useFrame(function SpatialHashingSystem() {
    for (const entity of entities) {
      entity.spatialHashMap.setEntity(
        entity,
        entity.transform.position.x,
        entity.transform.position.y,
        entity.transform.position.z,
      )
    }
  })

  return null
}
