import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import {
  defaultResource,
  resourceFromAttributes,
} from '@opentelemetry/resources';

const endpoint =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318';
const metricsUrl = endpoint.endsWith('/v1/metrics')
  ? endpoint
  : `${endpoint.replace(/\/$/, '')}/v1/metrics`;

const serviceName = process.env.OTEL_SERVICE_NAME ?? 'app';
const resource = defaultResource().merge(
  resourceFromAttributes({ 'service.name': serviceName }),
);

const sdk = new NodeSDK({
  resource,
  instrumentations: [getNodeAutoInstrumentations()],
  metricReaders: [
    new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({ url: metricsUrl }),
      exportIntervalMillis: 15000,
    }),
  ],
});

sdk.start();
