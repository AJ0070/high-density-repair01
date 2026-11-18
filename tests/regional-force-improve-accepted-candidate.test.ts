import { expect, test } from "bun:test"
import { HighDensityForceImproveSolver } from "lib/HighDensityForceImproveSolver"
import { RegionalForceImproveSolver } from "lib/RegionalForceImproveSolver"
import fixture from "./fixtures/h616-regional-via-pad.json"

test("keeps the optimized routes when the caller accepts their clearance", (): void => {
  const unrestricted = new HighDensityForceImproveSolver(
    structuredClone(fixture.input),
  )
  unrestricted.solve()
  const solver = new RegionalForceImproveSolver({
    ...structuredClone(fixture.input),
    isViaClearanceValid: (): boolean => true,
  })
  solver.solve()
  expect(unrestricted.solved).toBeTrue()
  expect(solver.solved).toBeTrue()
  expect(solver.failed).toBeFalse()
  expect(solver.getOutput()).toEqual(unrestricted.getOutput())
  expect(solver.getOutput()).not.toEqual(fixture.input.hdRoutes)
})
