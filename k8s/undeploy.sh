#!/usr/bin/env bash

kubectl delete deploy/cloudl-client-deployment
kubectl delete svc/cloudl-client-service

kubectl get pods