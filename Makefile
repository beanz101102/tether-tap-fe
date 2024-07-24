.PHONY: build

# Makefile usually have a default target.
all: build

# Function to determine the environment based on BUILD_ENV.
get_env = $(if $(filter production,$(BUILD_ENV)),.env.production,.env.$(or $(BUILD_ENV),development))

# Build target
build:
	@echo "Building for environment: $(get_env)..."
	npx prisma generate --no-engine
	npx env-cmd -f $(get_env) next build
