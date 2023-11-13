#!/usr/bin/env bash

kubectl delete pod/mongodb
kubectl delete svc/mongodb-service
kubectl delete deploy/cloudl-server-deployment
kubectl delete svc/cloudl-server-service

kubectl get pods