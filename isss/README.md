# ISSS pilot deployment (ISSSDP-512)

Everything ISSS-specific lives under `isss/`; the rest of this repository mirrors upstream.

`openshift/deploy-pilot.sh` stands the dev pilot up in OpenShift Silver namespace `dabb52-dev`
(builds stay in `dabb52-tools`) in stages (`db`, `fam`, `lookup`, `status`): a dev-grade PostgreSQL (`postgres-dev.yml`), the secrets
FAM reads, upstream's `common/openshift.init.yml`, the backend template with the public
`ghcr.io/bcgov/nr-fam/backend` image pinned by tag and digest (`BACKEND_TAG`), the frontend built in-cluster
from `main` (`frontend-build.yml`), and nr-user-lookup-api built in-cluster (`lookup-api-build.yml`) from
the branch carrying bcgov/nr-user-lookup-api#17 (checkout path `LOOKUP_SRC`, default
`~/Projects/nr-user-lookup-api/backend`). `pilot-network-policies.yml` lets only the FAM backend reach
the database and the lookup API (dev has no allow-same-namespace policy). Credentials come from local files
(`~/.config/nr-fam/css.env`, `~/.raven/.env`) through temp files; nothing secret is in this folder.

First run on 2026-10-15: route `https://nr-fam-isss-dev.apps.silver.devops.gov.bc.ca`, one replica of
each component, about 300m CPU / 1.1Gi memory of the namespace's 500m / 2Gi request quota.

Moved to `dabb52-dev` on 2026-10-20, after the quota increase (1 CPU / 4Gi / 2Gi storage), with the
tools database restored into the new one.

Renamed NRS Access Management (NAM) on 2026-10-20: the frontend is built in `dabb52-tools`
(`frontend-build.yml`) so env.json can brand it, and it answers at
`https://nam-dev.apps.silver.devops.gov.bc.ca` (a second Route; the old `nr-fam-isss-dev` host still works).
Both hosts are dev redirect URIs on CSS integration 6702.
