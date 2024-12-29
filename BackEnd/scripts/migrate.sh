#!/bin/bash
set -e

DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=password
DB_NAME=hh_db

files=(
    ./internal/db/migrations/0001_create_resume.sql
)

for file in "${files[@]}"; do
    echo "Applying migration: $file"

    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f $file 2>&1 | grep -v "already exists" || true
done

echo "Migrations applied successfully!"
