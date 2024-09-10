import { createServer } from 'nice-grpc'
import { openTelemetryServerMiddleware } from 'nice-grpc-opentelemetry'
import { HealthDefinition as HealthServiceDefinition } from 'nice-grpc-server-health'
import { TerminatorMiddleware } from 'nice-grpc-server-middleware-terminator'
import { ServerReflectionService } from 'nice-grpc-server-reflection'

import { getHealthService } from './services/healthService'
import { getServerReflectionService } from './services/serverReflectionService'

export const terminatorMiddleware = TerminatorMiddleware()

export const server = createServer().use(openTelemetryServerMiddleware()).use(terminatorMiddleware)

export const setupServer = async () => {
  const healthService = await getHealthService()

  const services = [
    [HealthServiceDefinition, healthService],
    [ServerReflectionService, await getServerReflectionService([HealthServiceDefinition.fullName])],
  ] as const

  services.forEach(([ServiceDefinition, service]) => {
    server.add(ServiceDefinition, service)
  })
}

export const teardownServer = async () => {
  terminatorMiddleware.terminate()
  return server.shutdown()
}
