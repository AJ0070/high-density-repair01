import { expect, test } from "bun:test"
import { HighDensityForceImproveSolver } from "lib/HighDensityForceImproveSolver"
import { RegionalForceImproveSolver } from "lib/RegionalForceImproveSolver"
import { getH616ViaPadClearance } from "./fixtures/getH616ViaPadClearance"
import fixture from "./fixtures/h616-regional-via-pad.json"

test("preserves H616's legal node when force improvement violates via clearance", (): void => {
  const originalFixture = structuredClone(fixture)
  expect(getH616ViaPadClearance(fixture.input.hdRoutes)).toBeGreaterThanOrEqual(
    fixture.minClearance,
  )
  const unrestricted = new HighDensityForceImproveSolver(
    structuredClone(fixture.input),
  )
  unrestricted.solve()
  expect(unrestricted.solved).toBeTrue()
  expect(getH616ViaPadClearance(unrestricted.getOutput())).toBeLessThan(
    fixture.minClearance,
  )

  const solver = new RegionalForceImproveSolver({
    ...fixture.input,
    isViaClearanceValid: (routes): boolean =>
      getH616ViaPadClearance(routes) >= fixture.minClearance,
  })
  solver.solve()
  expect(solver.solved).toBeTrue()
  expect(solver.failed).toBeFalse()
  expect(solver.getOutput()).toEqual(fixture.input.hdRoutes)
  expect(getH616ViaPadClearance(solver.getOutput())).toBeGreaterThanOrEqual(
    fixture.minClearance,
  )
  expect(fixture).toEqual(originalFixture)
})
