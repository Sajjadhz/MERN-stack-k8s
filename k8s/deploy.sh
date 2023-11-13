#!/usr/bin/env bash

kubectl apply -f cloudl-client-deployment.yml

kubectl get pods
kubectl get svc
