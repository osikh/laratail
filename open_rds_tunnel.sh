#!/bin/bash

# Define variables
SSH_ALIAS="MTM_SGD_PROD"

# Define an array of RDS endpoints and their respective local ports
declare -A RDS_SERVERS=(
    [3307]="mtm-production-database-engine.c94uwywmeqye.ap-southeast-1.rds.amazonaws.com"
    # [3308]=""
)

REMOTE_PORT=3306  # Default RDS MySQL port

echo "🔄 Checking existing tunnels..."

# Loop through RDS servers and start tunnels if not already running
for LOCAL_PORT in "${!RDS_SERVERS[@]}"; do
    RDS_ENDPOINT=${RDS_SERVERS[$LOCAL_PORT]}

    if pgrep -f "ssh -L $LOCAL_PORT:$RDS_ENDPOINT:$REMOTE_PORT" > /dev/null; then
        echo "✅ Tunnel already running: localhost:$LOCAL_PORT → $RDS_ENDPOINT:$REMOTE_PORT"
    else
        echo "🚀 Starting tunnel for $RDS_ENDPOINT..."
        ssh -f -N -L $LOCAL_PORT:$RDS_ENDPOINT:$REMOTE_PORT $SSH_ALIAS

        if [ $? -eq 0 ]; then
            echo "✅ Tunnel opened: localhost:$LOCAL_PORT → $RDS_ENDPOINT:$REMOTE_PORT"
        else
            echo "❌ Failed to open SSH tunnel for $RDS_ENDPOINT."
        fi
    fi
done

echo "✅ All tunnels checked."
