#!/bin/sh
# Ensure the uploads volume is writable by the Next.js user (uid 1001).
# Named/bind mounts often arrive as root-owned and break POST /api/media/upload.
set -e
mkdir -p /app/public/uploads
chown -R nextjs:nodejs /app/public/uploads
chmod -R ug+rwX /app/public/uploads
exec su-exec nextjs "$@"
