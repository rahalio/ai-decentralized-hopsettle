# Hopsettle

Mesh micropayment channel operations console — OpenAPI-first DDD monorepo for seller, buyer, relay, and superpeer operators.

Product specs: [PRODUCT.md](./PRODUCT.md) · [WEBAPP.md](./WEBAPP.md) · [USER_STORIES.md](./USER_STORIES.md)

## Packages

Scope: **`@hopsettle/*`**

| Package | Path |
|---------|------|
| OpenAPI | `packages/openapi-core` |
| Core | `packages/core` |
| Services / adapters / API | `platform/{services,adapters,api-server}` |
| Web console | `platform/webapp` |

Domains: `identity`, `channels`, `accounting`, `pricing`, `staking`, `settlement`, `reporting`, `disputes`, `topology`.

## Quick start

```bash
# If .codegen is missing (it is gitignored), copy from zero-apps-codegen-scaffold
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api    # http://127.0.0.1:4000/health
pnpm dev:web    # http://127.0.0.1:3000
```

Demo key: `X-API-Key: hopsettle_demo_local_dev_key`

## Codegen rules

- **New domain** → Mode A full multi-layer generate once.
- **YAML edit** → bundle + **core only**, then handwrite below.
- **`.codegen/` must never be committed** (see `.cursor/rules/codegen-no-commit.mdc`).

See `docs/CODEGEN.md` and `.cursor/skills/`.
