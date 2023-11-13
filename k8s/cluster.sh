#!/usr/bin/env bash
gcloud container clusters create cloudl \
  --scopes "cloud-platform" \
  --num-nodes 2 \
  --enable-basic-auth \
  --issue-client-certificate \
  --enable-ip-alias \
  --zone northamerica-northeast1-a