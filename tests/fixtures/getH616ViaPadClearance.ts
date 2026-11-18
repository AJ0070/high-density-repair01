import type { HighDensityRoute } from "lib/types/high-density-types"
import fixture from "./h616-regional-via-pad.json"

export function getH616ViaPadClearance(routes: HighDensityRoute[]): number {
  let minimumClearance = Infinity
  for (const route of routes) {
    if (!fixture.preloadedConnectionNames.includes(route.connectionName)) {
      continue
    }
    for (const via of route.vias) {
      minimumClearance = Math.min(
        minimumClearance,
        Math.hypot(via.x - fixture.pad.center.x, via.y - fixture.pad.center.y) -
          route.viaDiameter / 2 -
          fixture.pad.radius,
      )
    }
  }
  return minimumClearance
}
