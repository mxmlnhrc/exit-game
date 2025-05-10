# syntax=docker/dockerfile:1

FROM python:3.11-slim AS base

# Set workdir for all stages
WORKDIR /app

FROM base AS builder

# Install build dependencies (none needed for this project, but placeholder for future)

# Create venv and install dependencies using pip cache and bind mount for requirements.txt
RUN python -m venv .venv

COPY --link requirements.txt ./

RUN --mount=type=cache,target=/root/.cache/pip \
    .venv/bin/pip install --upgrade pip && \
    .venv/bin/pip install -r requirements.txt

# Copy application code (excluding venv, __pycache__, etc. via .dockerignore)
COPY --link . .

FROM base AS final

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser
USER appuser

WORKDIR /app

# Copy virtual environment from builder
COPY --from=builder /app/.venv /app/.venv
# Copy application code from builder
COPY --from=builder /app /app

# Set PATH to use venv
ENV PATH="/app/.venv/bin:$PATH"

# Expose default FastAPI port
EXPOSE 8000

# Entrypoint to run the FastAPI app with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
