# Project Constitution

## Purpose
- Define the system's architectural invariants and rules.

## Invariants
- All logic must be deterministic.
- External integrations require verification before use.
- Data schema is the single source of truth for payloads.
- No `tools/` scripts are created before discovery and schema confirmation.

## Rules
- Use `.env` for secrets.
- Keep ephemeral data in `.tmp/` only.
- Update `progress.md` after every meaningful task.
