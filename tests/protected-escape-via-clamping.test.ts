import { expect, test } from "bun:test"
import { runForceDirectedImprovement } from "../lib/HighDensityForceImproveSolver"
import type { HighDensityRoute } from "../lib/types/high-density-types"

test("bounds clamping preserves a protected pad escape before force movement", (): void => {
  const route: HighDensityRoute = {
    connectionName: "signal",
    traceThickness: 0.1,
    viaDiameter: 0.3,
    route: [
      { x: -0.5, y: 0, z: 0 },
      { x: -0.49, y: 0, z: 0 },
      { x: -0.49, y: 0, z: 1 },
      { x: 0.4, y: 0, z: 1 },
    ],
    vias: [{ x: -0.49, y: 0 }],
  }
  const original = structuredClone(route)
  const result = runForceDirectedImprovement(
    { minX: -0.5, maxX: 0.5, minY: -0.5, maxY: 0.5 },
    [route],
    0,
  )

  expect(result.routes[0]!.route).toEqual(original.route)
  expect(result.routes[0]!.vias).toEqual(original.vias)
  expect(route).toEqual(original)
})
