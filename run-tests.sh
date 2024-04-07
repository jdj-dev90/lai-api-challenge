#!/bin/bash
set -e

echo "Starting up the test environment..."
docker-compose -f compose.test.yml -p lai-api-test up -d --remove-orphans

echo "Waiting for the database to be ready..."
sleep 5

echo "Migrating the database..."
npm run prisma:migrate

echo "Running the tests..."
jest --config ./test/jest-e2e.js --runInBand
test_exit_code=$?

echo "Cleaning up the test environment..."
docker-compose -f compose.test.yml -p lai-api-test down
echo "Test environment cleanup complete."

exit $test_exit_code

