#!/bin/sh
# Soft-fix uploads dir permissions (legacy /uploads/* files). New admin
# uploads are stored in MySQL (uploaded_files) and do not need this volume.
mkdir -p /app/public/uploads || true
chown -R nextjs:nodejs /app/public/uploads 2>/dev/null || \
  chmod -R 777 /app/public/uploads 2>/dev/null || true
exec su-exec nextjs "$@"
