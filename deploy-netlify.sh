#!/bin/bash

# Netlify Deployment Script for Talk to My Lawyer App
# This script deploys the Next.js application to Netlify and sets environment variables

set -e

echo "🚀 Starting Netlify Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${RED}❌ Netlify CLI not found. Installing...${NC}"
    npm install -g netlify-cli
fi

# Check if logged in
echo -e "${YELLOW}📝 Checking Netlify authentication...${NC}"
if ! netlify status &> /dev/null; then
    echo -e "${YELLOW}🔐 Please log in to Netlify...${NC}"
    netlify login
fi

# Initialize/link the site
echo -e "${YELLOW}🔗 Linking to Netlify site...${NC}"
if [ ! -f .netlify/state.json ]; then
    echo -e "${YELLOW}Creating new Netlify site...${NC}"
    netlify init
else
    echo -e "${GREEN}✅ Already linked to Netlify site${NC}"
fi

# Set environment variables
echo -e "${YELLOW}🔧 Setting environment variables...${NC}"

# Check if .env file exists
if [ -f .env ]; then
    echo -e "${GREEN}✅ Found .env file, using it to set Netlify environment variables${NC}"
    
    # Read environment variables and set them in Netlify
    while IFS='=' read -r key value; do
        # Skip empty lines and comments
        if [[ ! -z "$key" ]] && [[ ! "$key" =~ ^#.* ]]; then
            # Remove quotes from value if present
            value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
            
            if [[ ! -z "$value" ]]; then
                echo -e "${YELLOW}Setting $key...${NC}"
                netlify env:set "$key" "$value" --silent || echo -e "${RED}Failed to set $key${NC}"
            fi
        fi
    done < .env
else
    echo -e "${RED}⚠️  No .env file found. Please create one based on .env.example${NC}"
    echo -e "${YELLOW}Required environment variables:${NC}"
    cat .env.example
    exit 1
fi

# Build the application
echo -e "${YELLOW}🔨 Building the application...${NC}"
pnpm install
pnpm build

# Deploy to Netlify
echo -e "${YELLOW}🚀 Deploying to Netlify...${NC}"
netlify deploy --prod

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🎉 Your application is now live on Netlify!${NC}"

# Show site URL
netlify open:site
