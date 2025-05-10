# Running the Project with Docker

This project includes a Docker setup for easy deployment and development. Below are the instructions and details specific to this project:

## Requirements & Dependencies
- **Python Version:** 3.11 (as specified in the Dockerfile)
- **Dependencies:** All Python dependencies are managed via `requirements.txt` and installed inside a virtual environment within the container.

## Environment Variables
- No required environment variables are specified in the Dockerfile or docker-compose file. If you need to add any, uncomment the `env_file` line in `docker-compose.yml` and provide a `.env` file.

## Build and Run Instructions
1. **Build and start the application:**
   ```sh
   docker compose up --build
   ```
   This will build the Docker image and start the FastAPI application.

2. **Access the application:**
   - The FastAPI app will be available at [http://localhost:8000](http://localhost:8000)

## Configuration Notes
- The application runs as a non-root user (`appuser`) inside the container for improved security.
- The container uses a Python virtual environment located at `/app/.venv`.
- No persistent volumes or external services are configured by default.

## Ports
- **8000:** Exposed by the container and mapped to the host for FastAPI (as per `docker-compose.yml` and Dockerfile).

---

*This section was updated to reflect the current Docker-based setup for this project.*
