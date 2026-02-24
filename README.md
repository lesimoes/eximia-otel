# otel

API NestJS (usuarios e transacoes) para o blog Eximia. Persistencia em PostgreSQL.

## Setup

```bash
npm install
docker compose up -d
npm run start:dev
```

## Comandos

- `npm run start:dev` - desenvolvimento com watch
- `npm run start:prod` - producao
- `npm run test` - testes unitarios
- `npm run test:e2e` - testes e2e

## Docker Compose

| Servico        | Finalidade |
|----------------|------------|
| postgres       | Banco da aplicacao (eximia_otel). Init em `docker/init.sql`. Porta 5432. |
| otel-collector | Recebe traces e logs em OTLP (grpc 4317, http 4318) e encaminha traces ao Tempo e logs ao Loki. |
| tempo          | Armazena traces. Recebe OTLP na porta 3200 (http) e 4317/4318 (otlp). |
| loki           | Armazena logs. API em 3100. Recebe logs via OTLP do collector. |
| grafana        | UI para visualizar traces (Tempo) e logs (Loki). Porta 3000, auth anonima habilitada. |

Credenciais postgres: user `admin`, senha `123456`, DB `eximia_otel`.

## Arquivos YAML em `docker/`

| Arquivo | Descricao |
|---------|-----------|
| `otel-collector-config.yaml` | Config do OpenTelemetry Collector: receivers OTLP (grpc/http), pipelines que enviam traces para Tempo e logs para Loki. |
| `tempo-config.yaml` | Config do Grafana Tempo: servidor, receptor OTLP, ingester, compactor e storage local em `/tmp/tempo`. |
| `loki-config.yaml` | Config do Loki: servidor, storage em filesystem, schema e cache para consultas. |
| `grafana/provisioning/datasources/datasources.yaml` | Provisioning do Grafana: datasources Tempo e Loki; link traces-to-logs entre eles. |
